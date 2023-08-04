package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.AvailableColorDao;
import com.trading212.crossedroads.dtos.AvailableColor;
import com.trading212.crossedroads.row_mappers.AvailableColorRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AvailableColorRepository implements AvailableColorDao {
    private final JdbcTemplate jdbcTemplate;

    public AvailableColorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public AvailableColor insertAvailableColor(AvailableColor availableColor) {
        var sql = """
                INSERT INTO available_colors(user_id, color_hash)
                VALUES (?, ?);
                """;
        int rowsAffected = jdbcTemplate.update(sql, availableColor.getUser_id(), availableColor.getColor_hash());
        if (rowsAffected > 0) {
            return getAvailableColorByUserIdAndColorHash(availableColor.getUser_id(), availableColor.getColor_hash())
                    .orElseThrow(() -> new IllegalStateException("Couldn't add available color"));
        } else {
            return null;
        }
    }

    @Override
    public List<AvailableColor> getAvailableColors() {
        var sql = """
                SELECT *
                FROM available_colors
                LIMIT 100;
                """;
        return jdbcTemplate.query(sql, new AvailableColorRowMapper());
    }

    @Override
    public List<AvailableColor> getAvailableColorsByUserId(long userId) {
        var sql = """
                SELECT *
                FROM available_colors
                WHERE user_id = ?
                """;
        return jdbcTemplate.query(sql, new AvailableColorRowMapper(), userId);
    }

    @Override
    public Optional<AvailableColor> getAvailableColorByUserIdAndColorHash(long userId, String colorHash) {
        var sql = """
                SELECT *
                FROM available_colors
                WHERE user_id = ? AND color_hash = ?
                """;
        return jdbcTemplate.query(sql, new AvailableColorRowMapper(), userId, colorHash)
                .stream()
                .findFirst();
    }

    @Override
    public int deleteAvailableColor(long userId, String colorHash) {
        var sql = """
                DELETE FROM available_colors
                WHERE user_id = ? AND color_hash = ?
                """;
        return jdbcTemplate.update(sql, userId, colorHash);
    }
}
