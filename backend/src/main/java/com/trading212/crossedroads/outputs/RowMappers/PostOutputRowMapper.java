package com.trading212.crossedroads.outputs.RowMappers;

import com.trading212.crossedroads.outputs.PostOutput;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class PostOutputRowMapper implements RowMapper<PostOutput> {
    @Override
    public PostOutput mapRow(ResultSet resultSet, int i) throws SQLException {
        PostOutput postOutput = new PostOutput();
        postOutput.setPost_id(resultSet.getLong("post_id"));
        postOutput.setUser_id(resultSet.getLong("user_id"));
        postOutput.setFirst_name(resultSet.getString("first_name"));
        postOutput.setLast_name(resultSet.getString("last_name"));
        postOutput.setProfile_pic_url(resultSet.getString("profile_pic_url"));
        postOutput.setContent(resultSet.getString("content"));
        postOutput.setCreated_at(
                resultSet.getTimestamp("created_at")
                        .toLocalDateTime()
                        .atZone(ZoneId.of("Europe/Sofia"))
        );
        postOutput.setUpdated_at(
                resultSet.getTimestamp("updated_at")
                        .toLocalDateTime()
                        .atZone(ZoneId.of("Europe/Sofia"))
        );
        return postOutput;
    }
}
