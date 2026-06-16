package com.smartqueue.smartqueue_backend.service;
import com.smartqueue.smartqueue_backend.model.Workplace;
import com.smartqueue.smartqueue_backend.repository.WorkplaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class WorkplaceService {
    @Autowired private WorkplaceRepository repo;
    public Workplace add(Workplace w) {
        if (w.getName()==null||w.getName().isBlank()) throw new RuntimeException("Name required");
        return repo.save(w);
    }
    public List<Workplace> getAll() { return repo.findAll(); }
    public List<Workplace> getByAdmin(String adminId) { return repo.findByAdminId(adminId); }
    public void delete(String id) { repo.deleteById(id); }
}
