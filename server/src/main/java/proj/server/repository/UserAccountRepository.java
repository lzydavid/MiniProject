package proj.server.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import proj.server.model.AccountRowMapper;
import proj.server.model.UserAccount;
import proj.server.model.UserCredentials;

@Repository
public class UserAccountRepository {

    private static final String INSERT_NEWACCOUNT_SQL = "insert into accounts(id,email,password,firstName,lastName) select ?,?,?,?,? where not exists (select * from accounts where email = ?)";

    private static final String RETRIEVE_ACCOUNT_BY_EMAIL_SQL = "select * from accounts where email = ?";

    private static final String RETRIEVE_ACCOUNT_BY_ID_SQL = "select * from accounts where id = ?";

    private static final String CHECK_ACCOUNT_EXIST_SQL = "select count(*) from accounts where email = ?";
    
    private static final String CHECK_CREDENTIAL_EXIST_SQL = "select count(*) from accounts where email = ? and password = ?;";

    private static final String UPDATEACCOUNT_SQL = "update accounts set email = ?, password = ? ,firstName = ?, lastName = ? where id = ?;";

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

    public boolean checkIfAccountExist(String email) {

        Integer returns = template.queryForObject(CHECK_ACCOUNT_EXIST_SQL,Integer.class,email);

        if(returns>0){
            return true;
        }
        return false;
    }

    public boolean checkIfCredentialsCorrect(UserCredentials uc){

        Integer returns = template.queryForObject(CHECK_CREDENTIAL_EXIST_SQL, Integer.class,uc.getEmail(),uc.getPassword());

        if(returns>0){
            return true;
        }
        return false;
    }

    public Optional<UserAccount> retrieveAccountByEmail(String email){

        try{
            UserAccount account = template.queryForObject(RETRIEVE_ACCOUNT_BY_EMAIL_SQL, new AccountRowMapper(), email);

            return Optional.of(account);
        }
        catch(DataAccessException e){
            return Optional.empty();
        }
    }

    public UserAccount retrieveAccountById(String id){

        UserAccount account = template.queryForObject(RETRIEVE_ACCOUNT_BY_ID_SQL, new AccountRowMapper(), id);

        return account;
    }

    public boolean updateUserAccount(UserAccount acc) {

        int update = template.update(UPDATEACCOUNT_SQL,acc.getEmail(),acc.getPassword(),acc.getFirstName(),acc.getLastName(),acc.getId());

        if(update>0){
            return true;
        }else{
            return false;
        }
    }



}
