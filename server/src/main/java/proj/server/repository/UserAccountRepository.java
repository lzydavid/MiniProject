package proj.server.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import proj.server.model.AccountRowMapper;
import proj.server.model.UserAccount;
import proj.server.model.UserLogin;

@Repository
public class UserAccountRepository {

    private static final String INSERT_NEWACCOUNT_SQL = "insert into accounts(id,email,password,firstName,lastName) select ?,?,?,?,? where not exists (select * from accounts where email = ?)";

    private static final String RETRIEVE_ACCOUNT_SQL = "select * from accounts where email = ?";

    // private static final String CHECK_EMAIL_EXIST_SQL = "select count(*) from accounts where email = ?;";
    
    @Autowired
    private JdbcTemplate template;

    public Boolean registerAccount(UserAccount acc){

        int updated = template.update(INSERT_NEWACCOUNT_SQL, acc.getId(),acc.getEmail(),acc.getPassword(),acc.getFirstName(),acc.getLastName(),acc.getEmail());

        if(updated>0){
            return true;
        }
        else{
            return false;
        }    
    }

    public Optional<UserAccount> retrieveAccount(UserLogin user){

        try{
            UserAccount account = template.queryForObject(RETRIEVE_ACCOUNT_SQL, new AccountRowMapper(), user.getEmail());

            return Optional.of(account);
        }
        catch(DataAccessException e){
            return Optional.empty();
        }
    }

}
