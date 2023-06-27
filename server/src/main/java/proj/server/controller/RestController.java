package proj.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.jsonwebtoken.Claims;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import proj.server.JwtUtils;
import proj.server.model.PlaceDetails;
import proj.server.model.TextSearchResults;
import proj.server.model.UserAccount;
import proj.server.model.UserCollection;
import proj.server.model.UserCredentials;
import proj.server.model.Exceptions.AccountNotFoundException;
import proj.server.model.Exceptions.InvalidCredentialsException;
import proj.server.service.GoogleMapApiService;
import proj.server.service.UserAccountService;
import proj.server.service.UserCollectionService;

@Controller
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
public class RestController {

    @Autowired
    private GoogleMapApiService svc;
    @Autowired
    private UserAccountService accSvc;
    @Autowired
    private UserCollectionService colSvc;
    
    @GetMapping(path = "/search",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearch(@RequestParam String query) throws IOException {

        TextSearchResults result = svc.googleMapTextSearchOkHttp(query);

        return ResponseEntity.ok().body(result.toJSON().toString());
    }

    @GetMapping(path = "/searchnearby",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearchCurrentLoc(@RequestParam String query,@RequestParam String Latitude, @RequestParam String Longitude) throws IOException {

        TextSearchResults result = svc.googleMapTextSearchCurrLocOkHttp(query, Latitude, Longitude);

        return ResponseEntity.ok().body(result.toJSON().toString());
    }

    @GetMapping(path = "/search/nextpage",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearchNxtPage(@RequestParam String pagetoken) throws IOException {
        
        TextSearchResults result = svc.googleMapTextSearchNextPage(pagetoken);

        return ResponseEntity.ok().body(result.toJSON().toString());
    }

    @GetMapping(path = "/search/{placeId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> placeDetailSearch(@PathVariable String placeId) throws IOException {
        PlaceDetails p = svc.googleMapPlaceDetailsSearch(placeId);
        return ResponseEntity.ok().body(p.toJSON().toString());
    }

    @PostMapping(path = "/register",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerNewUser(@RequestBody UserAccount newAcc){

        JsonObject result = accSvc.registerAccount(newAcc);

        return ResponseEntity.ok(result.toString());
    }

    @PostMapping(path = "/login",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserCredentials user) throws Exception{

        //check if acc exist in sql
        try {
            accSvc.LoginAccount(user);
            String token = JwtUtils.generateToken(user.getEmail(), user.getPassword());

            JsonObject body = Json.createObjectBuilder()
                .add("status", true)
                .add("token", token).build();
            return ResponseEntity.ok(body.toString());

        } catch (AccountNotFoundException e) {

            JsonObject body = Json.createObjectBuilder()
                .add("status", false)
                .add("error", e.getMessage())
                .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body.toString());

        } catch (InvalidCredentialsException e) {
            JsonObject body = Json.createObjectBuilder()
                .add("status", false)
                .add("error", e.getMessage())
                .build();
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(body.toString());
        }
    }

    @PutMapping(path = "/update",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateUserAccount(@RequestBody UserAccount acc){

        JsonObject result = accSvc.updateUserAccount(acc);
        
        return ResponseEntity.ok(result.toString());
    }


    @PostMapping(path = "/save",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveCollections(@RequestBody UserCollection[] collections,@RequestParam String id){

        // for (UserCollection userCollection : collections) {
        //     System.out.println(userCollection);
        // }

        Boolean updateSuccess = colSvc.saveCollections(collections, id);
        JsonObject body = Json.createObjectBuilder().add("status", updateSuccess).build();
        
        return ResponseEntity.ok(body.toString());
    }

    @GetMapping(path = "/acc",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAccDetails(@RequestHeader("Authorization") String token){

        Claims claims = JwtUtils.decodeToken(token);
        String email = claims.get("email", String.class);

        JsonObject result = accSvc.retrieveAccount(email);
        return ResponseEntity.ok(result.toString());
    }

    @GetMapping(path = "/col",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getUserCollections(@RequestParam String id){

        Optional<List<UserCollection>> opt = colSvc.retrieveCollections(id);

        if(opt.isPresent()){
            List<UserCollection> collections = opt.get();

            JsonArrayBuilder arrBld = Json.createArrayBuilder();
            for (UserCollection uc : collections) {
            arrBld.add(uc.toJSON());
            }
            return ResponseEntity.ok(arrBld.build().toString());
        }
        return ResponseEntity.noContent().build();
    }

    
}
