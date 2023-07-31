package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.ChatDao;
import com.trading212.crossedroads.dtos.Chat;
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
    public Optional<List<Chat>> getChatsByUserId(long userId) {
        var sql = """
                SELECT *
                FROM chats
                WHERE participant1_id = ? OR participant2_id = ?
                """;
        List<Chat> chats =  jdbcTemplate.query(sql, new ChatRowMapper(), userId, userId);
        return Optional.of(chats);
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
