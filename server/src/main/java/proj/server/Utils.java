package proj.server;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import proj.server.model.PlaceDetails;
import proj.server.model.Restaurant;
import proj.server.model.Reviews;
import proj.server.model.TextSearchResults;

public class Utils {

    //return textsearch result : list of result + next_page_token
    public static TextSearchResults getResult(String jsonStr) throws IOException {

        TextSearchResults result = new TextSearchResults();

        List<Restaurant> restaurants = new ArrayList<>();

        try(InputStream is = new ByteArrayInputStream(jsonStr.getBytes())){
            JsonReader reader = Json.createReader(is);
            JsonObject data = reader.readObject();

            if(data.containsKey("next_page_token")){

                result.setNextPageToken(data.getString("next_page_token"));
            }
            
            JsonArray arr = data.getJsonArray("results");

            System.out.println(arr.size());

            restaurants = arr.stream()
                .map(v->v.asJsonObject())
                .map(Utils::toRestaurant)
                .filter(v->v.getOperational()==true)
                .toList();

            result.setRestaurants(restaurants);
        }

        return result;
    }

    //convert json to restaurant object
    private static Restaurant toRestaurant(JsonObject o){

        Restaurant r = new Restaurant();

        r.setAddress(o.getString("formatted_address"));
        r.setName(o.getString("name"));

        if(o.containsKey("price_level")){
            r.setPriceLevel(o.getInt("price_level"));
        }

        if(o.containsKey("rating")){
            r.setRating(o.getJsonNumber("rating").bigDecimalValue().floatValue());
        }
    
        r.setPlaceId(o.getString("place_id"));

        if(o.containsKey("photos")){
            JsonArray photosArr = o.getJsonArray("photos");
            JsonObject photoObj = photosArr.getJsonObject(0);
            r.setPhotoRef(photoObj.getString("photo_reference"));
        }

        String opt= o.getString("business_status");
        System.out.println("Business status: "+o.getString("name")+opt);
        if(opt.equalsIgnoreCase("OPERATIONAL")){
            r.setOperational(true);
        }else{
            r.setOperational(false);
        }

        return r;
    }

    public static PlaceDetails getPlaceDetails(String jsonStr) throws IOException{

        try(InputStream is = new ByteArrayInputStream(jsonStr.getBytes())){
            JsonReader reader = Json.createReader(is);
            JsonObject data = reader.readObject();

            JsonObject results = data.getJsonObject("result");

            PlaceDetails p = new PlaceDetails();

            p.setPlaceId(results.getString("place_id"));
            p.setName(results.getString("name"));
            p.setAddress(results.getString("formatted_address"));

            if(results.containsKey("delivery")){
                p.setDelivery(results.getBoolean("delivery"));;
            }

            if(results.containsKey("dine_in")){
                p.setDineIn(results.getBoolean("dine_in"));;
            }

            if(results.containsKey("takeout")){
                p.setTakeout(results.getBoolean("takeout"));;
            }

            if(results.containsKey("reservable")){
                p.setReservable(results.getBoolean("reservable"));;
            }


            if(results.containsKey("price_level")){
                p.setPriceLevel(results.getInt("price_level"));
            }

             if(results.containsKey("rating")){
                p.setRating(results.getJsonNumber("rating").bigDecimalValue().floatValue());
            }

            if(results.containsKey("user_ratings_total")){
                p.setNumOfUserRating(results.getInt("user_ratings_total"));
            }

            if(results.containsKey("current_opening_hours")){
                JsonObject currOpHrs = results.getJsonObject("current_opening_hours");
                p.setOpenNow(currOpHrs.getBoolean("open_now"));

                JsonArray openinghrs = currOpHrs.getJsonArray("weekday_text");
                String ophrs[] = new String[openinghrs.size()];
                for (int i = 0; i < openinghrs.size(); i++) {
                    String str = openinghrs.getString(i).replaceAll("\\?", " ");
                    ophrs[i] = str;
                }
                p.setOpeningHours(ophrs);
            }

             if(results.containsKey("formatted_phone_number")){
                p.setPhoneNo(results.getString("formatted_phone_number"));
            }

            if(results.containsKey("website")){
                p.setWebsite(results.getString("website"));
            }

             if(results.containsKey("wheelchair_accessible_entrance")){
                p.setWheelChairAccessible(results.getBoolean("wheelchair_accessible_entrance"));;
            }

            if(results.containsKey("serves_breakfast")){
                p.setServesBreakfast(results.getBoolean("serves_breakfast"));;
            }

            if(results.containsKey("serves_brunch")){
                p.setServesBrunch(results.getBoolean("serves_brunch"));;
            }

            if(results.containsKey("serves_lunch")){
                p.setServesLunch(results.getBoolean("serves_lunch"));;
            }

            if(results.containsKey("serves_dinner")){
                p.setServesDinner(results.getBoolean("serves_dinner"));;
            }

            if(results.containsKey("serves_dinner")){
                p.setServesDinner(results.getBoolean("serves_dinner"));;
            }

            if(results.containsKey("serves_beer")){
                p.setServesBeer(results.getBoolean("serves_beer"));;
            }

            if(results.containsKey("serves_wine")){
                p.setServesWine(results.getBoolean("serves_wine"));;
            }

            if(results.containsKey("serves_vegetarian_food")){
                p.setServesVegetarianFood(results.getBoolean("serves_vegetarian_food"));;
            }

            List<Reviews> reviews = new ArrayList<>();
            if(results.containsKey("reviews")){
                JsonArray reviewArr = results.getJsonArray("reviews");

                for (int i = 0; i < reviewArr.size(); i++) {
                    Reviews r = new Reviews();
                    JsonObject rw = reviewArr.getJsonObject(i);
                    r.setAuthor(rw.getString("author_name"));
                    r.setDescription(rw.getString("text"));
                    r.setRating(rw.getInt("rating"));
                    r.setTime(rw.getString("relative_time_description"));
                    r.setProfileUrl(rw.getString("profile_photo_url"));
                    reviews.add(r);
                }
            }
            p.setReviews(reviews);

            return p;
        }
    }
}
