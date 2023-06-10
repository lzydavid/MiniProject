package proj.server.model;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccount {
    
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    public JsonObject toJSON(){
        return Json.createObjectBuilder()
            .add("id", getId())
            .add("email", getEmail())
            .add("password", getPassword())
            .add("firstName", getFirstName())
            .add("lastName", getLastName())
            .build();
    }
}
