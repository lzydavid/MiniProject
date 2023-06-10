package proj.server;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import proj.server.model.PlaceDetails;
import proj.server.model.Restaurant;
import proj.server.model.TextSearchResults;
import proj.server.service.GoogleMapApiService;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner{

	@Autowired
	GoogleMapApiService svc;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// String query = "cafe in Jurong West,Singapore";
		// String encodedString = URLEncoder.encode(query, StandardCharsets.UTF_8);
		// System.out.println(encodedString);
		// TextSearchResults r = svc.googleMapTextSearch(encodedString);
		// List<Restaurant> res = r.getRestaurants();
		// System.out.println(res.size());
		// for (Restaurant restaurant : res) {
		// 	System.out.println(restaurant);
		// }
		// System.out.println(r.getNextPageToken());

		// PlaceDetails p = svc.googleMapPlaceDetailsSearch("ChIJy64vxOwP2jERIp3kxn84fJM");
		// System.out.println(p);

		// String str = "11:30?AM???10:00?PM";
		// System.out.println(str.replaceFirst("\\?", " ").replaceAll("\\?{3}", " - ").replaceAll("\\?", " "));

	}

}
