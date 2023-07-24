package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.AvailableColor;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AvailableColorRowMapper implements RowMapper<AvailableColor> {
    @Override
    public AvailableColor mapRow(ResultSet resultSet, int i) throws SQLException {
        return new AvailableColor(
                resultSet.getLong("user_id"),
                resultSet.getString("color_hash")
        );
    }
}
