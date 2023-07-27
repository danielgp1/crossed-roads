package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Visit;

import java.util.List;
import java.util.Optional;

public interface VisitDao {
    Visit insertVisit(Visit visit);

    List<Visit> getVisits();

    Optional<List<Visit>> getVisitsByVisitedId(long visitedUserId);
    Optional<List<Visit>> getVisitsByVisitorId(long visitorUserId);

    boolean isUserVisited(long visitorId, long visitedId);

    int deleteVisit(long visitedUserId, long visitorUserId);
}
