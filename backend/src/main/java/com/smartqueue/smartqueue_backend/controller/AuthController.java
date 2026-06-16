package com.smartqueue.smartqueue_backend.controller;
import com.smartqueue.smartqueue_backend.config.JwtUtil;
import com.smartqueue.smartqueue_backend.dto.AuthRequest;
import com.smartqueue.smartqueue_backend.dto.AuthResponse;
import com.smartqueue.smartqueue_backend.model.User;
import com.smartqueue.smartqueue_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") @CrossOrigin(origins="*")
public class AuthController {
    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest req) {
        User u = new User();
        u.setName(req.getName()!=null&&!req.getName().isBlank()?req.getName().trim():req.getEmail().split("@")[0]);
        u.setEmail(req.getEmail()); u.setPassword(req.getPassword()); u.setRole("USER");
        User saved = userService.register(u);
        return new AuthResponse(saved.getId(),saved.getName(),saved.getEmail(),saved.getRole(),
                jwtUtil.generateToken(saved.getId(),saved.getRole()),saved.getCreatedAt());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        User u = userService.login(req.getEmail(),req.getPassword());
        if ("ADMIN".equals(u.getRole())) throw new RuntimeException("Please use Admin login page");
        return new AuthResponse(u.getId(),u.getName(),u.getEmail(),u.getRole(),
                jwtUtil.generateToken(u.getId(),u.getRole()),u.getCreatedAt());
    }

    @PostMapping("/admin/register")
    public AuthResponse adminRegister(@RequestBody AuthRequest req) {
        User u = new User();
        u.setName(req.getName()!=null&&!req.getName().isBlank()?req.getName().trim():req.getEmail().split("@")[0]);
        u.setEmail(req.getEmail()); u.setPassword(req.getPassword()); u.setRole("ADMIN");
        User saved = userService.register(u);
        return new AuthResponse(saved.getId(),saved.getName(),saved.getEmail(),saved.getRole(),
                jwtUtil.generateToken(saved.getId(),saved.getRole()),saved.getCreatedAt());
    }

    @PostMapping("/admin/login")
    public AuthResponse adminLogin(@RequestBody AuthRequest req) {
        User u = userService.login(req.getEmail(),req.getPassword());
        if (!"ADMIN".equals(u.getRole())) throw new RuntimeException("Not an admin account");
        return new AuthResponse(u.getId(),u.getName(),u.getEmail(),u.getRole(),
                jwtUtil.generateToken(u.getId(),u.getRole()),u.getCreatedAt());
    }
}
