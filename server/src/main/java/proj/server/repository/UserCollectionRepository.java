package proj.server.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import proj.server.model.Restaurant;
import proj.server.model.UserCollection;

@Repository
public class UserCollectionRepository {
    
    @Autowired
    private JdbcTemplate template;

    private static final String INSERT_INTO_COL_TABLE_SQL = 
    "insert ignore into collection(col_id,collection_name,acc_id) values (?,?,?)";

    private static final String INSERT_INTO_COLRES_TABLE_SQL = "insert into collection_restaurant (collection_id,restaurant_id) select ? , ? where not exists(select 1 from collection_restaurant where collection_id = ? and restaurant_id = ?);";

    private static final String INSERT_INTO_RES_TABLE_SQL = "insert into restaurants(place_id,name,address,rating,photo_ref,price_level) values (?,?,?,?,?,?)";

    public void insertIntoCollectionTable(UserCollection c){

        template.update(INSERT_INTO_COL_TABLE_SQL, c.getColId(),c.getCollectionName(),c.getAccId());
        
    }

    public void insertIntoColResTable(String colId,String placeId){

        template.update(INSERT_INTO_COLRES_TABLE_SQL,colId,placeId);
    }

    public void insertIntoResTable(Restaurant[] restaurants){

       template.batchUpdate(INSERT_INTO_RES_TABLE_SQL, new BatchPreparedStatementSetter() {

        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            
            Restaurant r = restaurants[i];
            ps.setString(1, r.getPlaceId());
            ps.setString(2, r.getName());
            ps.setString(3, r.getAddress());
            ps.setFloat(4, r.getRating());
            ps.setString(5, r.getPhotoRef());
            ps.setInt(6, r.getPriceLevel());
        }

        @Override
        public int getBatchSize() {
            return restaurants.length;
        }
        
       });
    }
}
