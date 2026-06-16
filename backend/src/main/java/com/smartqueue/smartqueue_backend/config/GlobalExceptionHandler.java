package com.smartqueue.smartqueue_backend.config;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handle(RuntimeException ex) { return ex.getMessage(); }
}
