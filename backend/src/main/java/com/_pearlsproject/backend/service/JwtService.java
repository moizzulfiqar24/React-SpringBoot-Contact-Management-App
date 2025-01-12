//package com._pearlsproject.backend.service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import java.security.Key;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Service
//public class JwtService {
//    @Value("${security.jwt.secret-key}")
//    private String secretKey;
//
//    @Value("${security.jwt.expiration-time}")
//    private long jwtExpiration;
//
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    public String generateToken(UserDetails userDetails) {
//        return generateToken(new HashMap<>(), userDetails);
//    }
//
//    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
//        return buildToken(extraClaims, userDetails, jwtExpiration);
//    }
//
//    public long getExpirationTime() {
//        return jwtExpiration;
//    }
//
////    private String buildToken(
////            Map<String, Object> extraClaims,
////            UserDetails userDetails,
////            long expiration
////    ) {
////        return Jwts
////                .builder()
////                .setClaims(extraClaims)
////                .setSubject(userDetails.getUsername())
////                .setIssuedAt(new Date(System.currentTimeMillis()))
////                .setExpiration(new Date(System.currentTimeMillis() + expiration))
////                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
////                .compact();
////    }
//
//    private String buildToken(
//            Map<String, Object> extraClaims,
//            UserDetails userDetails,
//            long expiration
//    ) {
//        String token = Jwts.builder()
//                .setClaims(extraClaims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + expiration))
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//        System.out.println("Generated Token for user " + userDetails.getUsername() + ": " + token);
//        return token;
//    }
//
//
////    public boolean isTokenValid(String token, UserDetails userDetails) {
////        final String username = extractUsername(token);
////        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
////    }
//
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        System.out.println("Extracted Username from Token: " + username);
//        System.out.println("Expected Username: " + userDetails.getUsername());
//        System.out.println("Is Token Expired: " + isTokenExpired(token));
//        boolean isValid = (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//        System.out.println("Is Token Valid: " + isValid);
//        return isValid;
//    }
//
//
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
////    private Claims extractAllClaims(String token) {
////        return Jwts
////                .parserBuilder()
////                .setSigningKey(getSignInKey())
////                .build()
////                .parseClaimsJws(token)
////                .getBody();
////    }
//
////    private Claims extractAllClaims(String token) {
////        Claims claims = Jwts.parserBuilder()
////                .setSigningKey(getSignInKey())
////                .build()
////                .parseClaimsJws(token)
////                .getBody();
////        System.out.println("Extracted Claims: " + claims);
////        return claims;
////    }
//
//    private Claims extractAllClaims(String token) {
//        try {
//            Claims claims = Jwts.parserBuilder()
//                    .setSigningKey(getSignInKey())
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//            System.out.println("Extracted Claims: " + claims);
//            return claims;
//        } catch (Exception e) {
//            System.err.println("Error parsing token: " + e.getMessage());
//            throw new RuntimeException("Invalid JWT Token");
//        }
//    }
//
//
//
//    private Key getSignInKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        System.out.println("Decoded Secret Key (length: " + keyBytes.length + "): " + java.util.Arrays.toString(keyBytes));
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//}


package com._pearlsproject.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    // Extract the subject (now email) from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);  // This will return the email
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Generate token using UserDetails (for login)
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Generate token with extra claims (if needed)
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        // Cast UserDetails to User to access email
        String email = ((com._pearlsproject.backend.model.User) userDetails).getEmail();
        return buildToken(extraClaims, email, jwtExpiration);  // Use email as the subject
    }

    // Build token with subject as email
    private String buildToken(
            Map<String, Object> extraClaims,
            String subject,  // Email will be passed here
            long expiration
    ) {
        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)  // Subject is set as email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
        System.out.println("Generated Token for user (email): " + subject + ": " + token);
        return token;
    }

    // Validate token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractUsername(token);  // Extract email from token
        System.out.println("Extracted Email from Token: " + email);
        System.out.println("Expected Email: " + ((com._pearlsproject.backend.model.User) userDetails).getEmail());
        System.out.println("Is Token Expired: " + isTokenExpired(token));
        boolean isValid = (email.equals(((com._pearlsproject.backend.model.User) userDetails).getEmail())) && !isTokenExpired(token);
        System.out.println("Is Token Valid: " + isValid);
        return isValid;
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from the token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println("Extracted Claims: " + claims);
            return claims;
        } catch (Exception e) {
            System.err.println("Error parsing token: " + e.getMessage());
            throw new RuntimeException("Invalid JWT Token");
        }
    }

    // Decode the secret key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        System.out.println("Decoded Secret Key (length: " + keyBytes.length + "): " + java.util.Arrays.toString(keyBytes));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Date getTokenExpirationTime() {
        return new Date(System.currentTimeMillis() + jwtExpiration);  // Returns the exact expiry time
    }

}
