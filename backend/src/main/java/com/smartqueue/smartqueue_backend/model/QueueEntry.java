package com.smartqueue.smartqueue_backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "queue_entries")
public class QueueEntry {
    @Id private String id;
    private String userId, workplaceId, sessionId;
    private int token;
    private long joinedAt = System.currentTimeMillis();
    private Long servedAt;
    private long waitSeconds;
    public String getId() { return id; } public void setId(String v) { id = v; }
    public String getUserId() { return userId; } public void setUserId(String v) { userId = v; }
    public String getWorkplaceId() { return workplaceId; } public void setWorkplaceId(String v) { workplaceId = v; }
    public String getSessionId() { return sessionId; } public void setSessionId(String v) { sessionId = v; }
    public int getToken() { return token; } public void setToken(int v) { token = v; }
    public long getJoinedAt() { return joinedAt; } public void setJoinedAt(long v) { joinedAt = v; }
    public Long getServedAt() { return servedAt; } public void setServedAt(Long v) { servedAt = v; }
    public long getWaitSeconds() { return waitSeconds; } public void setWaitSeconds(long v) { waitSeconds = v; }
}
