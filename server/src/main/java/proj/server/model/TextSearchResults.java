package proj.server.model;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextSearchResults {
    
    private List<Restaurant> restaurants;
    private String nextPageToken;

    public JsonObject toJSON(){

        List<JsonObject> objs = restaurants.stream()
            .map(Restaurant::toJSON)
            .collect(Collectors.toList());

        JsonArrayBuilder arrBld = Json.createArrayBuilder(objs);

        if(nextPageToken==null){
            return Json.createObjectBuilder()
            .add("results", arrBld).build();
        }

        return Json.createObjectBuilder()
            .add("results", arrBld)
            .add("nextPageToken", nextPageToken)
            .build();
    }
}
