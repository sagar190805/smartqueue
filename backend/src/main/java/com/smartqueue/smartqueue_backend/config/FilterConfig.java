package com.smartqueue.smartqueue_backend.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class FilterConfig {
    @Autowired private JwtFilter jwtFilter;
    @Bean
    public FilterRegistrationBean<JwtFilter> registerJwt() {
        FilterRegistrationBean<JwtFilter> r = new FilterRegistrationBean<>();
        r.setFilter(jwtFilter); r.addUrlPatterns("/api/*"); r.setOrder(1);
        return r;
    }
}
