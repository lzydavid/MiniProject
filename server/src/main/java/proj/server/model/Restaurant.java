package proj.server.model;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
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

        JsonObjectBuilder objBld = Json.createObjectBuilder();

        if(getName()!=null){
            objBld.add("name", getName());
        }

        if(getAddress()!=null){
            objBld.add("address", getAddress());
        }

        if(getPhotoRef()!=null){
            objBld.add("photoRef", getPhotoRef());
        }

        if(getPlaceId()!=null){
            objBld.add("placeId", getPlaceId());
        }

        objBld.add("rating", getRating())
            .add("priceLevel", getPriceLevel());


        return objBld.build();
    }

}
