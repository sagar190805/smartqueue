package com.smartqueue.smartqueue_backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "users")
public class User {
    @Id private String id;
    private String name;
    @Indexed(unique = true) private String email;
    private String password;
    private String role;
    private long createdAt = System.currentTimeMillis();
    public String getId() { return id; } public void setId(String v) { id = v; }
    public String getName() { return name; } public void setName(String v) { name = v; }
    public String getEmail() { return email; } public void setEmail(String v) { email = v; }
    public String getPassword() { return password; } public void setPassword(String v) { password = v; }
    public String getRole() { return role; } public void setRole(String v) { role = v; }
    public long getCreatedAt() { return createdAt; } public void setCreatedAt(long v) { createdAt = v; }
}
