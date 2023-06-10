package proj.server.model;

import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDetails {
    
    private String placeId;
    private String name;
    private String address;
    private Boolean openNow;
    private String[] openingHours;
    private String phoneNo = "-";
    private String website = "-";
    private Integer priceLevel = 0;
    private List<Reviews> reviews;

    public JsonObject toJSON() {

        JsonArrayBuilder arrBld = Json.createArrayBuilder();
        for (String str : openingHours) {
            arrBld.add(str);
        }
        JsonArray openingHours = arrBld.build();

        JsonArray reviews = Json.createArrayBuilder(getReviews()
            .stream()
            .map(Reviews::toJSON)
            .toList())
            .build();

        JsonObject placeDetails = Json.createObjectBuilder()
            .add("placeId", getPlaceId())
            .add("name", getName())
            .add("address", getAddress())
            .add("openNow", getOpenNow())
            .add("phoneNo", getPhoneNo())
            .add("website",getWebsite())
            .add("priceLevel", getPriceLevel())
            .add("opening_hours", openingHours)
            .add("reviews", reviews)
            .build();

        return placeDetails;
    }
}
