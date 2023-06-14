package proj.server.model;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {

    private String address;
    private String name;
    private Float rating = -1f; //google rating
    private String photoRef = "none";
    private String placeId;
    private Integer priceLevel = -1;
    private Boolean operational;

    public JsonObject toJSON(){

        return Json.createObjectBuilder()
        .add("name", getName())
        .add("address", getAddress())
        .add("rating", getRating())
        .add("photoRef", getPhotoRef())
        .add("placeId", getPlaceId())
        .add("priceLevel", getPriceLevel())
        .build();
    }

}
