package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.MessageDao;
import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.row_mappers.MessageRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MessageRepository implements MessageDao {
    private final JdbcTemplate jdbcTemplate;

    public MessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Message insertMessage(Message message) {
        var sql = """
                INSERT INTO messages(chat_id, sender_id, receiver_id, content)
                VALUES (?, ?, ?, ?)
                """;
        int rowsAffected = jdbcTemplate.update(sql, message.getChat_id(), message.getSender_id(), message.getReceiver_id(), message.getContent());
        if (rowsAffected > 0) {
            return message;
        } else {
            return null;
        }
    }

    @Override
    public List<Message> getAllMessages() {
        var sql = """
                SELECT *
                FROM messages
                """;
        return jdbcTemplate.query(sql, new MessageRowMapper());
    }

    @Override
    public Optional<Message> getMessageById(long messageId) {
        var sql = """
                SELECT *
                FROM messages
                WHERE message_id = ?
                """;
        return jdbcTemplate.query(sql, new MessageRowMapper(), messageId)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<List<Message>> getChatMessages(long user1_id, long user2_id) {
        var sql = """
                SELECT *
                FROM messages
                WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
                """;
        List<Message> messages = jdbcTemplate.query(sql, new MessageRowMapper(), user1_id, user2_id, user2_id, user1_id);
        return Optional.of(messages);
    }

    @Override
    public Optional<List<Message>> getMessagesBySenderId(long senderId) {
        var sql = """
                SELECT *
                FROM messages
                WHERE sender_id = ?
                """;
        List<Message> messages = jdbcTemplate.query(sql, new MessageRowMapper(), senderId);
        return Optional.of(messages);
    }

    @Override
    public int deleteMessage(long messageId) {
        var sql = """
                DELETE FROM messages
                WHERE message_id = ?
                """;
        return jdbcTemplate.update(sql, messageId);
    }
}
