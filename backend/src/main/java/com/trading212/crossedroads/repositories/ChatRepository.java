package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.ChatDao;
import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.outputs.ChatOutput;
import com.trading212.crossedroads.outputs.RowMappers.ChatOutputRowMapper;
import com.trading212.crossedroads.row_mappers.ChatRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ChatRepository implements ChatDao {
    private final JdbcTemplate jdbcTemplate;

    public ChatRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Chat insertChat(Chat chat) {
        var sql = """
                INSERT INTO chats(participant1_id, participant2_id)
                VALUES (?, ?)
                """;
        int rowsAffected = jdbcTemplate.update(sql, chat.getParticipant1_id(), chat.getParticipant2_id());
        if (rowsAffected > 0) {
            return chat;
        } else {
            return null;
        }
    }

    @Override
    public List<Chat> getAllChats() {
        var sql = """
                SELECT *
                FROM chats
                """;
        return jdbcTemplate.query(sql, new ChatRowMapper());
    }

    @Override
    public Optional<Chat> getChatById(long chatId) {
        var sql = """
                SELECT *
                FROM chats
                WHERE chat_id = ?
                """;
        return jdbcTemplate.query(sql, new ChatRowMapper(), chatId)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<List<ChatOutput>> getChatSummariesByUserId(long userId) {
        var sql = """
            SELECT c.chat_id, c.participant1_id, c.participant2_id,
                   m.content AS latest_message_content, m.created_at AS latest_message_time, m.sender_id AS latest_message_sender_id
            FROM chats c
            JOIN messages m ON c.chat_id = m.chat_id
            WHERE (c.participant1_id = ? OR c.participant2_id = ?)
            AND m.message_id = (
                SELECT MAX(message_id)
                FROM messages
                WHERE chat_id = c.chat_id
            )
            ORDER BY m.created_at DESC
            """;
        List<ChatOutput> chats =  jdbcTemplate.query(sql, new ChatOutputRowMapper(), userId, userId);
        return Optional.of(chats);
    }

    @Override
    public int getChatIdIfExists(long participant1Id, long participant2Id) {
        var sql = """
            SELECT chat_id
            FROM chats
            WHERE (participant1_id = ? AND participant2_id = ?) OR (participant1_id = ? AND participant2_id = ?)
            """;
        List<Integer> chatIds = jdbcTemplate.query(sql, (rs, rowNum) -> rs.getInt("chat_id"), participant1Id, participant2Id, participant2Id, participant1Id);
        return chatIds.isEmpty() ? -1 : chatIds.get(0);
    }

    @Override
    public int deleteChat(long chatId) {
        var sql = """
                DELETE FROM chats
                WHERE chat_id = ?
                """;
        return jdbcTemplate.update(sql, chatId);
    }
}
