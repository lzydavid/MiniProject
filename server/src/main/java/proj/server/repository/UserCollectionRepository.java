package proj.server.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import proj.server.model.Restaurant;
import proj.server.model.RestaurantRowMapp;
import proj.server.model.UserCollection;

@Repository
public class UserCollectionRepository {
    
    @Autowired
    private JdbcTemplate template;

    private static final String INSERT_INTO_COL_TABLE_SQL = 
    "insert ignore into collection(col_id,collection_name,acc_id) values (?,?,?)";

    private static final String INSERT_INTO_COLRES_TABLE_SQL = "insert into collection_restaurant (collection_id,restaurant_id) select ? , ? where not exists(select 1 from collection_restaurant where collection_id = ? and restaurant_id = ?);";

    private static final String INSERT_INTO_RES_TABLE_SQL = "insert ignore into restaurants(place_id,name,address,rating,photo_ref,price_level) values (?,?,?,?,?,?)";

    private static final String RETRIEVE_RES_BY_COLID = "select distinct r.* from restaurants as r inner join collection_restaurant as cr on r.place_id = cr.restaurant_id where cr.collection_id = ?;";

    private static final String RETRIEVE_COL_BY_ACCID = "select * from collection where acc_id = ?";

    public void insertIntoCollectionTable(UserCollection c,String AccId){

        template.update(INSERT_INTO_COL_TABLE_SQL,c.getColId() ,c.getCollectionName(),AccId);
        
    }

    public void insertIntoColResTable(String colId,String placeId){

        template.update(INSERT_INTO_COLRES_TABLE_SQL,colId,placeId,colId,placeId);
    }

    public void insertIntoResTable(List<Restaurant> restaurants){

       template.batchUpdate(INSERT_INTO_RES_TABLE_SQL, new BatchPreparedStatementSetter() {

        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            
            Restaurant r = restaurants.get(i);
            ps.setString(1, r.getPlaceId());
            ps.setString(2, r.getName());
            ps.setString(3, r.getAddress());
            ps.setFloat(4, r.getRating());
            ps.setString(5, r.getPhotoRef());
            ps.setInt(6, r.getPriceLevel());
        }

        @Override
        public int getBatchSize() {
            return restaurants.size();
        }
        
       });
    }

    public Optional<List<UserCollection>> getCollectionByAccId(String AccId){

        List<UserCollection> collections = new ArrayList<>();

        SqlRowSet rs = template.queryForRowSet(RETRIEVE_COL_BY_ACCID,AccId);
        
        while(rs.next()){

            UserCollection uc = new UserCollection();
            String colId = rs.getString("col_id");
            uc.setColId(colId);
            uc.setCollectionName(rs.getString("collection_name"));
            List<Restaurant> restaurants = retrieveRestaurants(colId);
            uc.setRestaurants(restaurants);

            collections.add(uc);
        }
        
        return collections.isEmpty()? Optional.empty(): Optional.of(collections);
    }

    public List<Restaurant> retrieveRestaurants(String colId) {

        List<Restaurant> res = template.query(RETRIEVE_RES_BY_COLID, new RestaurantRowMapp(), colId);

        return res;
    }

    
}
