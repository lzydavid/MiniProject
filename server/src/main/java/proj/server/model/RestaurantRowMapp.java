package proj.server.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class RestaurantRowMapp implements RowMapper<Restaurant>{

    @Override
    public Restaurant mapRow(ResultSet rs, int rowNum) throws SQLException {
        Restaurant r = new Restaurant();
        r.setPlaceId(rs.getString("place_id"));
        r.setName(rs.getString("name"));
        r.setAddress(rs.getString("address"));
        r.setRating(rs.getFloat("rating"));
        r.setPhotoRef(rs.getString("photo_ref"));
        r.setPriceLevel(rs.getInt("price_level"));
        return r;
    }
    
}
