package proj.server.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCollection {
    
    private String accId;
    private String colId;
    private String collectionName;
    private List<Restaurant> restaurants;
}
