package com.smartqueue.smartqueue_backend.config;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired private JwtUtil jwtUtil;
    private static final List<String> PUBLIC = List.of(
        "/api/auth/login","/api/auth/register",
        "/api/auth/admin/login","/api/auth/admin/register","/ws"
    );
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String path = req.getRequestURI();
        if (req.getMethod().equals("OPTIONS") || PUBLIC.stream().anyMatch(path::startsWith)) {
            chain.doFilter(req, res); return;
        }
        String header = req.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            res.setStatus(401); res.setContentType("text/plain");
            res.getWriter().write("Please login first"); return;
        }
        String token = header.substring(7);
        if (!jwtUtil.validateToken(token)) {
            res.setStatus(401); res.setContentType("text/plain");
            res.getWriter().write("Session expired. Please login again."); return;
        }
        req.setAttribute("userId", jwtUtil.extractUserId(token));
        req.setAttribute("role",   jwtUtil.extractRole(token));
        chain.doFilter(req, res);
    }
}
