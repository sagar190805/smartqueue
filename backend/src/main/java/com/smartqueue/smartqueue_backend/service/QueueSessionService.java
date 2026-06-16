package com.smartqueue.smartqueue_backend.service;

import com.smartqueue.smartqueue_backend.dto.AnalyticsDTO;
import com.smartqueue.smartqueue_backend.dto.QueueMemberDTO;
import com.smartqueue.smartqueue_backend.dto.QueueStatusDTO;
import com.smartqueue.smartqueue_backend.model.QueueEntry;
import com.smartqueue.smartqueue_backend.model.QueueSession;
import com.smartqueue.smartqueue_backend.model.User;
import com.smartqueue.smartqueue_backend.repository.QueueEntryRepository;
import com.smartqueue.smartqueue_backend.repository.QueueSessionRepository;
import com.smartqueue.smartqueue_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QueueSessionService {

    @Autowired private QueueSessionRepository repository;
    @Autowired private QueueEntryRepository entryRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    public QueueSession startSession(String workplaceId, String sessionName) {
        if (workplaceId==null||workplaceId.isBlank()) throw new RuntimeException("Workplace ID required");
        if (sessionName==null||sessionName.isBlank()) throw new RuntimeException("Session name required");
        repository.findByWorkplaceIdAndActiveTrue(workplaceId).forEach(s -> {
            s.setActive(false); repository.save(s);
        });
        QueueSession session = new QueueSession();
        session.setWorkplaceId(workplaceId);
        session.setSessionName(sessionName.trim());
        session.setActive(true);
        session.setCurrentToken(0);
        session.setTotalTokens(0);
        session.setCreatedAt(System.currentTimeMillis());
        QueueSession saved = repository.save(session);
        broadcast(workplaceId);
        return saved;
    }

    public QueueSession getActiveSession(String workplaceId) {
        List<QueueSession> list = repository.findByWorkplaceIdAndActiveTrue(workplaceId);
        return list.isEmpty() ? null : list.get(0);
    }

    public List<QueueSession> getAllSessions(String workplaceId) {
        return repository.findByWorkplaceIdOrderByCreatedAtDesc(workplaceId);
    }

    public int joinQueue(String workplaceId, String userId) {
        QueueSession s = getActiveSession(workplaceId);
        if (s == null) throw new RuntimeException("No active session. Wait for admin to start one.");
        if (s.getQueue().contains(userId)) return s.getQueue().indexOf(userId) + 1;
        s.getQueue().add(userId);
        s.setTotalTokens(s.getTotalTokens() + 1);
        repository.save(s);
        QueueEntry entry = new QueueEntry();
        entry.setUserId(userId); entry.setWorkplaceId(workplaceId);
        entry.setSessionId(s.getId()); entry.setToken(s.getQueue().size());
        entry.setJoinedAt(System.currentTimeMillis());
        entryRepository.save(entry);
        broadcast(workplaceId);
        return s.getQueue().size();
    }

    public String leaveQueue(String workplaceId, String userId) {
        QueueSession s = getActiveSession(workplaceId);
        if (s == null) throw new RuntimeException("No active session");
        if (!s.getQueue().contains(userId)) throw new RuntimeException("You are not in this queue");
        s.getQueue().remove(userId);
        repository.save(s);
        entryRepository.findByUserIdAndSessionId(userId, s.getId())
                .ifPresent(entryRepository::delete);
        broadcast(workplaceId);
        return "Left queue successfully";
    }

    public int nextToken(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        if (s == null) throw new RuntimeException("No active session");
        if (!s.getQueue().isEmpty()) {
            String servedUserId = s.getQueue().remove(0);
            s.setCurrentToken(s.getCurrentToken() + 1);
            repository.save(s);
            entryRepository.findByUserIdAndSessionId(servedUserId, s.getId())
                    .ifPresent(entry -> {
                        long now = System.currentTimeMillis();
                        entry.setServedAt(now);
                        entry.setWaitSeconds((now - entry.getJoinedAt()) / 1000);
                        entryRepository.save(entry);
                    });
        }
        broadcast(workplaceId);
        return s.getCurrentToken();
    }

    public int getCurrentToken(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        return s == null ? 0 : s.getCurrentToken();
    }

    public int getQueueSize(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        return s == null ? 0 : s.getQueue().size();
    }

    public List<String> getQueue(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        return s == null ? List.of() : s.getQueue();
    }

    public List<QueueMemberDTO> getQueueWithNames(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        if (s == null) return List.of();
        List<QueueMemberDTO> members = new ArrayList<>();
        List<String> queue = s.getQueue();
        for (int i = 0; i < queue.size(); i++) {
            String userId = queue.get(i);
            String name = "Unknown", email = userId;
            try {
                var opt = userRepository.findById(userId);
                if (opt.isPresent()) {
                    User u = opt.get();
                    name = u.getName(); email = u.getEmail();
                }
            } catch (Exception ignored) {}
            members.add(new QueueMemberDTO(i + 1, userId, name, email));
        }
        return members;
    }

    public boolean isActive(String workplaceId) { return getActiveSession(workplaceId) != null; }

    public void closeSession(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        if (s != null) { s.setActive(false); repository.save(s); broadcast(workplaceId); }
    }

    public int peopleAhead(String workplaceId, String userId) {
        QueueSession s = getActiveSession(workplaceId);
        return s == null ? -1 : s.getQueue().indexOf(userId);
    }

    public AnalyticsDTO getAnalytics(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        List<QueueEntry> served = entryRepository.findByWorkplaceIdAndServedAtNotNull(workplaceId);
        double avg = served.stream().mapToLong(QueueEntry::getWaitSeconds).average().orElse(0.0);
        return new AnalyticsDTO(
                served.size(), avg,
                s != null ? s.getQueue().size() : 0,
                s != null ? s.getCurrentToken() : 0,
                s != null ? s.getSessionName() : "None",
                s != null
        );
    }

    private void broadcast(String workplaceId) {
        QueueSession s = getActiveSession(workplaceId);
        messagingTemplate.convertAndSend("/topic/queue/" + workplaceId,
                new QueueStatusDTO(workplaceId,
                        s != null ? s.getCurrentToken() : 0,
                        s != null ? s.getQueue().size() : 0,
                        s != null,
                        s != null ? s.getSessionName() : ""));
    }
}
