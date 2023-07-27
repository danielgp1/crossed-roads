package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.Visit;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class VisitRowMapper implements RowMapper<Visit> {
    @Override
    public Visit mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Visit(
                resultSet.getLong("visited_id"),
                resultSet.getLong("visitor_id"),
                resultSet.getTimestamp("visited_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia"))
        );
    }
}
