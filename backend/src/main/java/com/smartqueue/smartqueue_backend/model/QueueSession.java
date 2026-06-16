package com.smartqueue.smartqueue_backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
@Document(collection = "queue_sessions")
public class QueueSession {
    @Id private String id;
    private String workplaceId, sessionName;
    private boolean active;
    private int currentToken, totalTokens;
    private long createdAt = System.currentTimeMillis();
    private List<String> queue = new ArrayList<>();
    public String getId() { return id; } public void setId(String v) { id = v; }
    public String getWorkplaceId() { return workplaceId; } public void setWorkplaceId(String v) { workplaceId = v; }
    public String getSessionName() { return sessionName; } public void setSessionName(String v) { sessionName = v; }
    public boolean isActive() { return active; } public void setActive(boolean v) { active = v; }
    public int getCurrentToken() { return currentToken; } public void setCurrentToken(int v) { currentToken = v; }
    public int getTotalTokens() { return totalTokens; } public void setTotalTokens(int v) { totalTokens = v; }
    public long getCreatedAt() { return createdAt; } public void setCreatedAt(long v) { createdAt = v; }
    public List<String> getQueue() { return queue; } public void setQueue(List<String> v) { queue = v; }
}
