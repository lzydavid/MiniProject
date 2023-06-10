package proj.server.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import proj.server.model.UserAccount;
import proj.server.model.UserLogin;
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

    public JsonObject retrieveAccount(UserLogin user){
        Optional<UserAccount> opt = repo.retrieveAccount(user);

        if(opt.isEmpty()){
            return Json.createObjectBuilder()
                .add("status", false)
                .add("message", "Account does not exist")
                .build();
        }else{

            UserAccount acc = opt.get();
            System.out.println(acc);

            if(!user.getPassword().equals(acc.getPassword())){
                return Json.createObjectBuilder()
                .add("status", false)
                .add("message", "Password entered is wrong")
                .build();
            }
            else{
                return Json.createObjectBuilder()
                    .add("status", true)
                    .add("account", acc.toJSON())
                    .build();
            }
        }
    }
}
