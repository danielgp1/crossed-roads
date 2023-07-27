package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.VisitDao;
import com.trading212.crossedroads.dtos.Visit;
import com.trading212.crossedroads.row_mappers.VisitRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VisitRepository implements VisitDao {
    private final JdbcTemplate jdbcTemplate;

    public VisitRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Visit> getVisits() {
        var sql = """
                SELECT *
                FROM visits
                """;
        return jdbcTemplate.query(sql, new VisitRowMapper());
    }
    @Override
    public Visit insertVisit(Visit visit) {
        var sql = """
                INSERT INTO visits (visited_id, visitor_id, visited_at)
                VALUES (?, ?, NOW())
                ON DUPLICATE KEY UPDATE visited_at = NOW()
                """;
        int rowsAffected = jdbcTemplate.update(sql, visit.getVisited_id(), visit.getVisitor_id());
        if (rowsAffected > 0) {
            return visit;
        } else {
            return null;
        }
    }

    @Override
    public boolean isUserVisited(long visitorId, long visitedId) {
        var sql = """
                SELECT COUNT(*) > 0
                FROM visits
                WHERE visitor_id = ? AND visited_id = ?
                """;
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(sql, Boolean.class, visitorId, visitedId));
    }

    @Override
    public Optional<List<Visit>> getVisitsByVisitorId(long visitorId) {
        var sql = """
                SELECT *
                FROM visits
                WHERE visitor_id = ?
                """;
        List<Visit> visits =jdbcTemplate.query(sql, new VisitRowMapper(), visitorId);
        return Optional.of(visits);
    }

    @Override
    public Optional<List<Visit>> getVisitsByVisitedId(long visitedId) {
        var sql = """
                SELECT *
                FROM visits
                WHERE visited_id = ?
                """;
        List<Visit> visits = jdbcTemplate.query(sql, new VisitRowMapper(), visitedId);
        return Optional.of(visits);
    }

    @Override
    public int deleteVisit(long visitorId, long visitedId) {
        var sql = """
                DELETE FROM visits
                WHERE visitor_id = ? AND visited_id = ?
                """;
        return jdbcTemplate.update(sql, visitorId, visitedId);
    }
}
