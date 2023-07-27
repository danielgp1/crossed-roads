package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.VisitDao;
import com.trading212.crossedroads.dtos.Visit;
import com.trading212.crossedroads.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {
    private final VisitDao visitDao;

    public VisitService(VisitDao visitDao) {
        this.visitDao = visitDao;
    }

    public Visit insertVisit(Visit visit) {
        return visitDao.insertVisit(visit);
    }

    public List<Visit> getVisits() {
        return visitDao.getVisits();
    }

    public boolean isUserVisited(long visitorId, long visitedId) {
        return visitDao.isUserVisited(visitorId, visitedId);
    }

    public List<Visit> getVisitsByVisitorId(long visitorId) {
        return visitDao.getVisitsByVisitorId(visitorId)
                .orElseThrow(() -> new NotFoundException(String.format("Visitor with id %d not found", visitorId)));
    }

    public List<Visit> getVisitsByVisitedId(long visitedId) {
        return visitDao.getVisitsByVisitedId(visitedId)
                .orElseThrow(() -> new NotFoundException(String.format("Visited with id %d not found", visitedId)));
    }


    public void deleteVisit(long visitorId, long visitedId) {
        int rowsAffected = visitDao.deleteVisit(visitorId, visitedId);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete visit");
        }
    }
}
