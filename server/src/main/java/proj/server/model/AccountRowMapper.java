package proj.server.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class AccountRowMapper implements RowMapper<UserAccount>{

    @Override
    public UserAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserAccount a = new UserAccount();
        a.setId(rs.getString("id"));
        a.setEmail(rs.getString("email"));
        a.setPassword(rs.getString("password"));
        a.setFirstName(rs.getString("firstName"));
        a.setLastName(rs.getString("lastName"));
        return a;
    }
    
}
