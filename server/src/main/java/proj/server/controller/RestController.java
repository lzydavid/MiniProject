package proj.server.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.json.JsonObject;
import proj.server.model.PlaceDetails;
import proj.server.model.TextSearchResults;
import proj.server.model.UserAccount;
import proj.server.model.UserLogin;
import proj.server.service.GoogleMapApiService;
import proj.server.service.UserAccountService;

@Controller
@RequestMapping(path = "/api")
public class RestController {

    @Autowired
    private GoogleMapApiService svc;
    @Autowired
    private UserAccountService accSvc;
    
    @GetMapping(path = "/search",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> restaurantSearch(@RequestParam String query,@RequestParam String location) throws IOException {

        String q = query.trim() + " in " + location.trim() + ",Singapore";
		String encodedString = URLEncoder.encode(q, StandardCharsets.UTF_8);
        System.out.println(encodedString);

        TextSearchResults result = svc.googleMapTextSearch(encodedString);

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
    public ResponseEntity<String> login(@RequestBody UserLogin user){

        JsonObject result = accSvc.retrieveAccount(user);
        return ResponseEntity.ok(result.toString());
    }
}
