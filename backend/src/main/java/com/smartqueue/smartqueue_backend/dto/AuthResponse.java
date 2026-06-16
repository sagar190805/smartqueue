package com.smartqueue.smartqueue_backend.dto;
public class AuthResponse {
    private String id, name, email, role, token;
    private long createdAt;
    public AuthResponse() {}
    public AuthResponse(String id,String name,String email,String role,String token,long createdAt){
        this.id=id;this.name=name;this.email=email;this.role=role;this.token=token;this.createdAt=createdAt;
    }
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;}
    public String getRole(){return role;} public void setRole(String v){role=v;}
    public String getToken(){return token;} public void setToken(String v){token=v;}
    public long getCreatedAt(){return createdAt;} public void setCreatedAt(long v){createdAt=v;}
}
