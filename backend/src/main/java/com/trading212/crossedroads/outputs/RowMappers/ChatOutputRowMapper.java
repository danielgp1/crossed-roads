package com.trading212.crossedroads.outputs.RowMappers;
import com.trading212.crossedroads.outputs.ChatOutput;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class ChatOutputRowMapper implements RowMapper<ChatOutput> {
    @Override
    public ChatOutput mapRow(ResultSet resultSet, int i) throws SQLException {
        return new ChatOutput(
                resultSet.getLong("chat_id"),
                resultSet.getLong("participant1_id"),
                resultSet.getLong("participant2_id"),
                resultSet.getString("latest_message_content"),
                resultSet.getLong("latest_message_sender_id"),
                resultSet.getTimestamp("latest_message_time").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia")),
                resultSet.getBoolean("friend_online")
        );
    }
}
