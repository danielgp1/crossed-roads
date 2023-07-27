package com.trading212.crossedroads.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/users/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry.addMapping("/api/available-colors/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry.addMapping("/api/friendships/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry.addMapping("/api/visits/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry.addMapping("/api/posts/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry.addMapping("/api/auth/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST"); // Specify the allowed HTTP methods

    }
}