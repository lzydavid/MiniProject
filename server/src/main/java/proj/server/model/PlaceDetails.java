package proj.server.model;

import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
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
    private Boolean delivery;
    private Boolean dineIn;
    private String[] openingHours;
    private String phoneNo;
    private String website;
    private Integer priceLevel = -1;
    private Integer numOfUserRating = -1;
    private Float rating = 0.0f;
    private List<Reviews> reviews;

    public JsonObject toJSON() {

        JsonObjectBuilder objBld = Json.createObjectBuilder();

        objBld.add("placeId", getPlaceId())
            .add("name", getName())
            .add("address", getAddress());

        if(getOpenNow()!=null){
            objBld.add("openNow", getOpenNow());
        }
        
        if(getDelivery()!=null){
            objBld.add("delivery", getDelivery());
        }

        if(getDineIn()!=null){
            objBld.add("dineIn", getDineIn());
        }

        if(getOpeningHours()!=null){
            JsonArrayBuilder arrBld = Json.createArrayBuilder();
            for (String str : openingHours) {
                arrBld.add(str);
            }
            JsonArray openingHours = arrBld.build();
            objBld.add("opening_hours", openingHours);
        }

        if(getPhoneNo()!=null){
            objBld.add("phoneNo", getPhoneNo());
        }

        if(getWebsite()!=null){
            objBld.add(website, getWebsite());
        }


        if(getReviews()!=null){
            JsonArray reviews = Json.createArrayBuilder(getReviews()
                .stream()
                .map(Reviews::toJSON)
                .toList())
                .build();
            objBld.add("reviews", reviews);
        }


        JsonObject placeDetails = objBld.build();


        // JsonObject placeDetails = Json.createObjectBuilder()
        //     .add("placeId", getPlaceId())
        //     .add("name", getName())
        //     .add("address", getAddress())
        //     .add("openNow", getOpenNow())
        //     .add("delivery", getDelivery())
        //     .add("dineIn", getDineIn())
        //     .add("phoneNo", getPhoneNo())
        //     .add("website",getWebsite())
        //     .add("priceLevel", getPriceLevel())
        //     .add("numOfUserRating", getNumOfUserRating())
        //     .add("rating", getRating())
        //     .add("opening_hours", openingHours)
        //     .add("reviews", reviews)
        //     .build();

        return placeDetails;
    }
}
