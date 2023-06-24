package proj.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
     @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Adjust the URL pattern to match your API endpoints
            .allowedOrigins("http://localhost:8080") // Add the allowed origin(s) here
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the allowed HTTP methods
            .allowedHeaders("*"); // Add the allowed headers, or restrict them based on your requirements
    }
}
