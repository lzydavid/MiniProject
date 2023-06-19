package proj.server.model;

import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCollection {
    
    private String colId;
    private String collectionName;
    private List<Restaurant> restaurants;

    public JsonObject toJSON(){

        JsonArrayBuilder arrBld = Json.createArrayBuilder();
        for (Restaurant r : restaurants) {
            arrBld.add(r.toJSON());
        }

        return Json.createObjectBuilder()
            .add("colId", getColId())
            .add("collectionName", getCollectionName())
            .add("restaurants", arrBld.build())
            .build();
    }
}
