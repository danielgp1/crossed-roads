package com.trading212.crossedroads.outputs.RowMappers;

import com.trading212.crossedroads.outputs.UserVisitorOutput;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class UserVisitorRowMapper implements RowMapper<UserVisitorOutput> {
    @Override
    public UserVisitorOutput mapRow(ResultSet resultSet, int i) throws SQLException {
        UserVisitorOutput userVisitorOutput = new UserVisitorOutput();
        userVisitorOutput.setId(resultSet.getLong("id"));
        userVisitorOutput.setFirst_name(resultSet.getString("first_name"));
        userVisitorOutput.setLast_name(resultSet.getString("last_name"));
        userVisitorOutput.setProfile_name(resultSet.getString("profile_name"));
        userVisitorOutput.setProfile_pic_url(resultSet.getString("profile_pic_url"));
        userVisitorOutput.setVisited_at(
                resultSet.getTimestamp("visited_at")
                        .toLocalDateTime()
                        .atZone(ZoneId.of("Europe/Sofia"))
        );
        return userVisitorOutput;
    }
}
