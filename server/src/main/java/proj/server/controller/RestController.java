package proj.server.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.jsonwebtoken.Claims;
import jakarta.json.Json;
import jakarta.json.JsonArray;
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
@CrossOrigin(origins = "http://localhost:4200")
public class RestController {

    @Autowired
    private GoogleMapApiService svc;
    @Autowired
    private UserAccountService accSvc;
    @Autowired
    private UserCollectionService colSvc;
    
    @GetMapping(path = "/search",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearch(@RequestParam String query,@RequestParam String location) throws IOException {

        String q = query.trim() + " in " + location.trim() + ",Singapore";
		String encodedString = URLEncoder.encode(q, StandardCharsets.UTF_8);
        System.out.println(encodedString);

        TextSearchResults result = svc.googleMapTextSearch(encodedString);

        // System.out.println(result);
        return ResponseEntity.ok().body(result.toJSON().toString());
    }

    @GetMapping(path = "/search/nextpage",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearchNxtPage(@RequestParam String pagetoken) throws IOException {
        
        TextSearchResults result = svc.googleMapTextSearchNextPage(pagetoken);

        // System.out.println(result);
        return ResponseEntity.ok().body(result.toJSON().toString());
    }

    @GetMapping(path = "/search/{placeId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> placeDetailSearch(@PathVariable String placeId) throws IOException {
        PlaceDetails p = svc.googleMapPlaceDetailsSearch(placeId);
        System.out.println(p);
        return ResponseEntity.ok().body(p.toJSON().toString());
    }

    @PostMapping(path = "/register",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerNewUser(@RequestBody UserAccount newAcc){
        System.out.println(">>>> postmapping"+newAcc);

        JsonObject result = accSvc.registerAccount(newAcc);
        System.out.println(result.toString());

        return ResponseEntity.ok(result.toString());
    }

    @PostMapping(path = "/login",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserCredentials user) throws Exception{

        System.out.println(user);

        //check if acc exist in sql
        try {
            accSvc.LoginAccount(user);
            String token = JwtUtils.generateToken(user.getEmail(), user.getPassword());
            System.out.println(token);

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

    @PostMapping(path = "/save",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveCollections(@RequestBody UserCollection[] collections,@RequestParam String id){

        for (UserCollection userCollection : collections) {
            System.out.println(userCollection);
        }

        colSvc.saveCollections(collections, id);
        
        return ResponseEntity.ok("ok");
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
