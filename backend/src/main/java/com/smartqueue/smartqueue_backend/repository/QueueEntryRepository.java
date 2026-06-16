package com.smartqueue.smartqueue_backend.repository;
import com.smartqueue.smartqueue_backend.model.QueueEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;
public interface QueueEntryRepository extends MongoRepository<QueueEntry, String> {
    Optional<QueueEntry> findByUserIdAndSessionId(String userId, String sessionId);
    List<QueueEntry> findByWorkplaceIdAndServedAtNotNull(String workplaceId);
}
