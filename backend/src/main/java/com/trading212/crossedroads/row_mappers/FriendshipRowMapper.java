package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.Friendship;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FriendshipRowMapper implements RowMapper<Friendship> {
    @Override
    public Friendship mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Friendship(
                resultSet.getLong("user1_id"),
                resultSet.getLong("user2_id")
        );
    }
}
