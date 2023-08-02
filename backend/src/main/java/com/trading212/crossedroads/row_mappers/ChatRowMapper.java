package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.Chat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class ChatRowMapper implements RowMapper<Chat> {
    @Override
    public Chat mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Chat(
                resultSet.getLong("chat_id"),
                resultSet.getLong("participant1_id"),
                resultSet.getLong("participant2_id"),
                resultSet.getTimestamp("created_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia"))
        );
    }
}
