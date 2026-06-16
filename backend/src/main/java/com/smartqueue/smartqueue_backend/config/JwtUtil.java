package com.smartqueue.smartqueue_backend.config;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
@Component
public class JwtUtil {
    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.expiration}") private long expiration;
    private Key key() { return Keys.hmacShaKeyFor(secret.getBytes()); }
    public String generateToken(String userId, String role) {
        return Jwts.builder()
                .setSubject(userId).claim("role",role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }
    public boolean validateToken(String token) {
        try { parseClaims(token); return true; }
        catch (JwtException|IllegalArgumentException e) { return false; }
    }
    public String extractUserId(String token) { return parseClaims(token).getSubject(); }
    public String extractRole(String token) { return parseClaims(token).get("role",String.class); }
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
    }
}
