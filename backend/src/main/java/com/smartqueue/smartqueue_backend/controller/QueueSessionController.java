package com.smartqueue.smartqueue_backend.controller;
import com.smartqueue.smartqueue_backend.dto.AnalyticsDTO;
import com.smartqueue.smartqueue_backend.dto.QueueMemberDTO;
import com.smartqueue.smartqueue_backend.model.QueueSession;
import com.smartqueue.smartqueue_backend.service.QueueSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/session") @CrossOrigin(origins="*")
public class QueueSessionController {
    @Autowired private QueueSessionService service;
    @PostMapping("/start/{wId}/{name}") public QueueSession start(@PathVariable String wId,@PathVariable String name){return service.startSession(wId,name);}
    @PostMapping("/join/{wId}/{uId}") public int join(@PathVariable String wId,@PathVariable String uId){return service.joinQueue(wId,uId);}
    @DeleteMapping("/leave/{wId}/{uId}") public String leave(@PathVariable String wId,@PathVariable String uId){return service.leaveQueue(wId,uId);}
    @PostMapping("/next/{wId}") public int next(@PathVariable String wId){return service.nextToken(wId);}
    @GetMapping("/current/{wId}") public int current(@PathVariable String wId){return service.getCurrentToken(wId);}
    @GetMapping("/size/{wId}") public int size(@PathVariable String wId){return service.getQueueSize(wId);}
    @GetMapping("/queue/{wId}") public List<String> queue(@PathVariable String wId){return service.getQueue(wId);}
    @GetMapping("/queue-members/{wId}") public List<QueueMemberDTO> members(@PathVariable String wId){return service.getQueueWithNames(wId);}
    @GetMapping("/active/{wId}") public boolean active(@PathVariable String wId){return service.isActive(wId);}
    @PostMapping("/close/{wId}") public String close(@PathVariable String wId){service.closeSession(wId);return "closed";}
    @GetMapping("/ahead/{wId}/{uId}") public int ahead(@PathVariable String wId,@PathVariable String uId){return service.peopleAhead(wId,uId);}
    @GetMapping("/all/{wId}") public List<QueueSession> all(@PathVariable String wId){return service.getAllSessions(wId);}
    @GetMapping("/details/{wId}") public QueueSession details(@PathVariable String wId){return service.getActiveSession(wId);}
    @GetMapping("/analytics/{wId}") public AnalyticsDTO analytics(@PathVariable String wId){return service.getAnalytics(wId);}
}
