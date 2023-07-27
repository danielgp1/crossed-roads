package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Visit;
import com.trading212.crossedroads.services.VisitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/visits")
public class VisitController {
    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping
    public Visit insertVisit(@RequestBody Visit visit) {
        return visitService.insertVisit(visit);
    }

    @GetMapping("/{visitorId}/{visitedId}")
    public boolean isUserVisited(@PathVariable("visitorId") long visitorId, @PathVariable("visitedId") long visitedId) {
        return visitService.isUserVisited(visitorId, visitedId);
    }

    @GetMapping("/visitor/{visitorId}")
    public List<Visit> getVisitsByVisitorId(@PathVariable("visitorId") long visitorId) {
        return visitService.getVisitsByVisitorId(visitorId);
    }

    @GetMapping("/visited/{visitedId}")
    public List<Visit> getVisitsByVisitedId(@PathVariable("visitedId") long visitedId) {
        return visitService.getVisitsByVisitedId(visitedId);
    }

    @GetMapping
    public List<Visit> getVisits() {
        return visitService.getVisits();
    }

    @DeleteMapping("/{visitorId}/{visitedId}")
    public void deleteVisit(@PathVariable("visitorId") long visitorId, @PathVariable("visitedId") long visitedId) {
        visitService.deleteVisit(visitorId, visitedId);
    }
}
