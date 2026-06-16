package com.smartqueue.smartqueue_backend.controller;
import com.smartqueue.smartqueue_backend.model.Workplace;
import com.smartqueue.smartqueue_backend.service.WorkplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/workplaces") @CrossOrigin(origins="*")
public class WorkplaceController {
    @Autowired private WorkplaceService service;
    @PostMapping public Workplace add(@RequestBody Workplace w) { return service.add(w); }
    @GetMapping public List<Workplace> all() { return service.getAll(); }
    @GetMapping("/admin/{adminId}") public List<Workplace> byAdmin(@PathVariable String adminId) { return service.getByAdmin(adminId); }
    @DeleteMapping("/{id}") public String delete(@PathVariable String id) { service.delete(id); return "deleted"; }
}
