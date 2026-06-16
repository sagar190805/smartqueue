package com.smartqueue.smartqueue_backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "workplaces")
public class Workplace {
    @Id private String id;
    private String name, type, location, adminId;
    private long createdAt = System.currentTimeMillis();
    public String getId() { return id; } public void setId(String v) { id = v; }
    public String getName() { return name; } public void setName(String v) { name = v; }
    public String getType() { return type; } public void setType(String v) { type = v; }
    public String getLocation() { return location; } public void setLocation(String v) { location = v; }
    public String getAdminId() { return adminId; } public void setAdminId(String v) { adminId = v; }
    public long getCreatedAt() { return createdAt; } public void setCreatedAt(long v) { createdAt = v; }
}
