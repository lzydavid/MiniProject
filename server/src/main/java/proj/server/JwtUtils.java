package proj.server;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtils {
    private static final String SECRET_KEY = "DOTA26627HOURSFAVOURITEHEROISORGEMAGIHIGHESTRANKDIVINE2";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    public static String generateToken(String email, String password) {
        // Create a signing key using your secret key
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        // Set the token claims (payload)
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("password", password);

        // Generate the JWT token
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public static Claims decodeToken(String token) {
        // Create a signing key using your secret key
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        // Parse the JWT token and retrieve the claims (payload)
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

