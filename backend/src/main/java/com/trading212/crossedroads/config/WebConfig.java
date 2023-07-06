package com.trading212.crossedroads.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/users")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET") // Specify the allowed HTTP methods
                .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers");
        registry.addMapping("/api/auth/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST"); // Specify the allowed HTTP methods
    }
}