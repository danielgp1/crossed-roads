package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        return new User(
                resultSet.getLong("id"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("profile_name"),
                resultSet.getString("password"),
                resultSet.getString("email"),
                resultSet.getDate("date_of_birth"),
                resultSet.getString("profile_pic_url"),
                resultSet.getString("current_color"),
                resultSet.getDouble("longitude"),
                resultSet.getDouble("latitude"),
                resultSet.getBoolean("is_online"),
                resultSet.getTimestamp("created_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia")),
                resultSet.getTimestamp("updated_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia"))
        );
    }
}