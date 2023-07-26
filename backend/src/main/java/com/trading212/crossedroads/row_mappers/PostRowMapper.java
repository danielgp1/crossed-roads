package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.Post;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class PostRowMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Post(
                resultSet.getLong("post_id"),
                resultSet.getLong("user_id"),
                resultSet.getString("content"),
                resultSet.getTimestamp("created_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia")),
                resultSet.getTimestamp("updated_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia"))

        );
    }
}
