package proj.server.model;

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
    private Restaurant[] restaurants;
}
