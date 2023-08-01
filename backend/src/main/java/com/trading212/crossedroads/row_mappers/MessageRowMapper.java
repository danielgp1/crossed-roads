package com.trading212.crossedroads.row_mappers;

import com.trading212.crossedroads.dtos.Message;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

public class MessageRowMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Message(
                resultSet.getLong("message_id"),
                resultSet.getLong("sender_id"),
                resultSet.getLong("receiver_id"),
                resultSet.getString("content"),
                resultSet.getTimestamp("created_at").toLocalDateTime().atZone(ZoneId.of("Europe/Sofia"))
        );
    }
}
