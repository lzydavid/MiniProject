package proj.server.model;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reviews {
    
    private String author;
    private Integer rating;
    private String description;
    private String time;
    
    public JsonObject toJSON(){
        return Json.createObjectBuilder()
            .add("author", getAuthor())
            .add("rating", getRating())
            .add("description",getDescription())
            .add("time", getTime())
            .build();
    }
}
