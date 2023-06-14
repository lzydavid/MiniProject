package proj.server.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import proj.server.Utils;
import proj.server.model.PlaceDetails;
import proj.server.model.TextSearchResults;

@Service
public class GoogleMapApiService {
    
    private static final String API_KEY="AIzaSyAKs4xwjpdFmZUq1dc8wbUeEDrcH4a14lg";
    private static final String GOOGLEMAP_TEXT_SEARCH="https://maps.googleapis.com/maps/api/place/textsearch/json";
    private static final String GOOGLEMAP_PLACE_DETAIL_SEARCH="https://maps.googleapis.com/maps/api/place/details/json";


    //return list of results + nextpagetoken
    public TextSearchResults googleMapTextSearch(String query) throws IOException {

        System.out.println(query);

        String url = UriComponentsBuilder.fromUriString(GOOGLEMAP_TEXT_SEARCH)
                .queryParam("query", query)
                .queryParam("key", API_KEY)
                .toUriString();

        System.out.println("query string:" + url);

        System.out.println("query string:" + url);
        
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> resp = restTemplate.getForEntity(url, String.class);

        return Utils.getResult(resp.getBody());
    }

    //return place search result
    public PlaceDetails googleMapPlaceDetailsSearch(String placeId) throws IOException{

        String url = UriComponentsBuilder.fromUriString(GOOGLEMAP_PLACE_DETAIL_SEARCH)
                .queryParam("place_id",placeId)
                .queryParam("key", API_KEY)
                .toUriString();
        
        System.out.println("place detail query string:" + url);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> resp = restTemplate.getForEntity(url, String.class);

        return Utils.getPlaceDetails(resp.getBody());
    }

}
