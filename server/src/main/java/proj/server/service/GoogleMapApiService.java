package proj.server.service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import okhttp3.Call;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import proj.server.Utils;
import proj.server.model.PlaceDetails;
import proj.server.model.TextSearchResults;

@Service
public class GoogleMapApiService {
    
    private static final String API_KEY="AIzaSyAKs4xwjpdFmZUq1dc8wbUeEDrcH4a14lg";
    private static final String GOOGLEMAP_TEXT_SEARCH="https://maps.googleapis.com/maps/api/place/textsearch/json";
    private static final String GOOGLEMAP_PLACE_DETAIL_SEARCH="https://maps.googleapis.com/maps/api/place/details/json";
    private static final String GOOGLEMAP_NEARBY_SEARCH="https://maps.googleapis.com/maps/api/place/nearbysearch/json";


    //return list of results + nextpagetoken
    public TextSearchResults googleMapTextSearch(String query,String location) throws IOException {

        String q = query.trim() + " in " + location.trim() + ",Singapore";
		//String encodedString = URLEncoder.encode(q, StandardCharsets.UTF_8);
        //System.out.println(encodedString);

        String url = UriComponentsBuilder.fromUriString(GOOGLEMAP_TEXT_SEARCH)
                .queryParam("query", query)
                .queryParam("key", API_KEY)
                .toUriString();

        System.out.println(url);
        
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> resp = restTemplate.getForEntity(url, String.class);

        return Utils.getResult(resp.getBody());
    }

    public TextSearchResults googleMapTextSearchNextPage(String nxtpagetoken) throws IOException {

        String url = UriComponentsBuilder.fromUriString(GOOGLEMAP_TEXT_SEARCH)
                .queryParam("pagetoken", nxtpagetoken)
                .queryParam("key", API_KEY)
                .toUriString();

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

    public TextSearchResults googleMapTextSearchOkHttp(String query,String location) throws IOException {

        String q = query.trim() + " in " + location.trim() + ",Singapore";
        System.out.println(q);

        HttpUrl.Builder urlBuilder = HttpUrl.parse(GOOGLEMAP_TEXT_SEARCH).newBuilder();
        urlBuilder.addQueryParameter("query", q).addQueryParameter("key", API_KEY);

        String url = urlBuilder.build().toString();

        System.out.println(url);
        
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder().url(url).build();
        Call call = client.newCall(request);
        Response response = call.execute();
        System.out.println(response.body().toString());


        String responseBody = response.body().string();
        
        response.close();

        return Utils.getResult(responseBody);
    }

    public TextSearchResults googleMapTextSearchCurrLocOkHttp(String query,String lat,String Long) throws IOException {

        String loc = lat + "," + Long;
        String key = "?key="+API_KEY;

        HttpUrl.Builder urlBuilder = HttpUrl.parse(GOOGLEMAP_NEARBY_SEARCH+key).newBuilder();
        urlBuilder.addQueryParameter("keyword", query)
                .addQueryParameter("location", loc)
                .addQueryParameter("radius", "1500");

        String url = urlBuilder.build().toString();

        System.out.println(url);
        
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder().url(url).build();
        Call call = client.newCall(request);
        Response response = call.execute();
        System.out.println(response.body().toString());


        String responseBody = response.body().string();
        
        response.close();

        return Utils.getResult(responseBody);
    }


}
