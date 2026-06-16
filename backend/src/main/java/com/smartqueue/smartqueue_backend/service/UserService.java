package com.smartqueue.smartqueue_backend.service;
import com.smartqueue.smartqueue_backend.model.User;
import com.smartqueue.smartqueue_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public User register(User user) {
        if (user.getName()==null||user.getName().isBlank()) throw new RuntimeException("Name is required");
        if (user.getEmail()==null||user.getEmail().isBlank()) throw new RuntimeException("Email is required");
        if (user.getPassword()==null||user.getPassword().length()<6) throw new RuntimeException("Password must be at least 6 characters");
        String email = user.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(email)) throw new RuntimeException("Email already registered");
        user.setEmail(email);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        if (email==null||password==null) throw new RuntimeException("Email and password are required");
        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(()->new RuntimeException("No account found with this email"));
        if (!encoder.matches(password, user.getPassword())) throw new RuntimeException("Incorrect password");
        return user;
    }

    public Optional<User> findById(String id) { return userRepository.findById(id); }
}
