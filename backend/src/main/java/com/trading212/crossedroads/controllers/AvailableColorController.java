package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.AvailableColor;
import com.trading212.crossedroads.services.AvailableColorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/available-colors")
public class AvailableColorController {
    private final AvailableColorService availableColorService;

    public AvailableColorController(AvailableColorService availableColorService) {
        this.availableColorService = availableColorService;
    }

    @PostMapping
    public AvailableColor insertAvailableColor(@RequestBody AvailableColor availableColor) {
        return availableColorService.insertAvailableColor(availableColor);
    }

    @GetMapping
    public List<AvailableColor> getAvailableColors() {
        return availableColorService.getAvailableColors();
    }

    @GetMapping("/users/{userId}")
    public List<AvailableColor> getAvailableColorsByUserId(@PathVariable("userId") long userId) {
        return availableColorService.getAvailableColorsByUserId(userId);
    }

    @GetMapping("/users/{userId}/colors/{colorHash}")
    public AvailableColor getAvailableColorByUserIdAndColorHash(@PathVariable("userId") long userId, @PathVariable("colorHash") String colorHash) {
        return availableColorService.getAvailableColorByUserIdAndColorHash(userId, colorHash);
    }

    @DeleteMapping("/users/{userId}/colors/{colorHash}")
    public void deleteAvailableColor(@PathVariable("userId") long userId, @PathVariable("colorHash") String colorHash) {
        availableColorService.deleteAvailableColor(userId, colorHash);
    }

}
