package proj.server.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import proj.server.model.UserAccount;
import proj.server.model.UserCredentials;
import proj.server.model.Exceptions.AccountNotFoundException;
import proj.server.model.Exceptions.InvalidCredentialsException;
import proj.server.repository.UserAccountRepository;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository repo;
    
    public JsonObject registerAccount(UserAccount newAcc){

        String id = UUID.randomUUID().toString().substring(0, 8);
        newAcc.setId(id);
       
        boolean newAccCreated = repo.registerAccount(newAcc);

        if(newAccCreated) {
            return Json.createObjectBuilder()
                .add("status", true)
                .add("message", "Account Created Successfully!")
                .build();
        }else{
            return Json.createObjectBuilder()
                .add("status", false)
                .add("message", "Email is already used!")
                .build();
        }

        
    }

    public JsonObject retrieveAccount(String email){
        
        Optional<UserAccount> opt = repo.retrieveAccountByEmail(email);

        if(opt.isEmpty()){
            return Json.createObjectBuilder()
                .add("status", false)
                .add("message", "Account does not exist")
                .build();
        }else{

            UserAccount acc = opt.get();
           
            return Json.createObjectBuilder()
                .add("account", acc.toJSON())
                .build();    
        }
    }

    public Boolean LoginAccount(UserCredentials uc) throws Exception{

        boolean emailExist = repo.checkIfAccountExist(uc.getEmail());
        if(!emailExist){
            throw new AccountNotFoundException("Email does not exist!");
        }
        else{
            
            boolean credentialMatch = repo.checkIfCredentialsCorrect(uc);
            if(!credentialMatch){
                throw new InvalidCredentialsException("Password is wrong!");
            }else{
                return true;
            }
        }
    }

    public JsonObject updateUserAccount(UserAccount acc) {

        UserAccount oldRecord = repo.retrieveAccountById(acc.getId());

        if(acc.getEmail().equalsIgnoreCase(oldRecord.getEmail())){

            boolean accountUpdated = repo.updateUserAccount(acc);

            if(accountUpdated){
                return Json.createObjectBuilder()
                    .add("status", true)
                    .add("message", "Account Updated Successfully")
                    .build();
            }else{
                return Json.createObjectBuilder()
                    .add("status", false)
                    .add("message", "Something Went Wrong Try Again")
                    .build();
            }
        }else{

            //check if new email is unique
            boolean emailExist = repo.checkIfAccountExist(acc.getEmail());

            if(!emailExist){

                boolean accountUpdated = repo.updateUserAccount(acc);

                if(accountUpdated){
                    return Json.createObjectBuilder()
                    .add("status", true)
                    .add("message", "Account Updated Successfully")
                    .build();
                }else{
                    return Json.createObjectBuilder()
                    .add("status", false)
                    .add("message", "Something Went Wrong Try Again")
                    .build();
                }
            }else{
                return Json.createObjectBuilder()
                    .add("status", false)
                    .add("message", "Email Already Existed")
                    .build();
            }
        }
    }
}
