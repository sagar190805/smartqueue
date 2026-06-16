package com.smartqueue.smartqueue_backend.repository;
import com.smartqueue.smartqueue_backend.model.QueueSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface QueueSessionRepository extends MongoRepository<QueueSession, String> {
    List<QueueSession> findByWorkplaceIdAndActiveTrue(String workplaceId);
    List<QueueSession> findByWorkplaceIdOrderByCreatedAtDesc(String workplaceId);
}
