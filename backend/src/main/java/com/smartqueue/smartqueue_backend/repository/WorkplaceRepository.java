package com.smartqueue.smartqueue_backend.repository;
import com.smartqueue.smartqueue_backend.model.Workplace;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface WorkplaceRepository extends MongoRepository<Workplace, String> {
    List<Workplace> findByAdminId(String adminId);
}
