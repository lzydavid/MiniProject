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


	}

}
