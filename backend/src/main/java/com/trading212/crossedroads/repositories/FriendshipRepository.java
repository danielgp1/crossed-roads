package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.FriendshipDao;
import com.trading212.crossedroads.dtos.Friendship;
import com.trading212.crossedroads.row_mappers.FriendshipRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FriendshipRepository implements FriendshipDao {
    private final JdbcTemplate jdbcTemplate;

    public FriendshipRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Friendship insertFriendship(Friendship friendship) {
        var sql = """
                INSERT INTO friendships(user1_id, user2_id)
                VALUES (?, ?)
                """;
        int rowsAffected = jdbcTemplate.update(sql, friendship.getUser1_id(), friendship.getUser2_id());
        if (rowsAffected > 0) {
            return friendship;
        } else {
            return null;
        }
    }

    @Override
    public List<Friendship> getFriendships() {
        var sql = """
                SELECT *
                FROM friendships
                """;
        return jdbcTemplate.query(sql, new FriendshipRowMapper());
    }

    @Override
    public List<Friendship> getFriendshipsByUserId(long userId) {
        var sql = """
                SELECT *
                FROM friendships
                WHERE user1_id = ? OR user2_id = ?
                """;
        return jdbcTemplate.query(sql, new FriendshipRowMapper(), userId, userId);
    }

    @Override
    public Optional<Friendship> getFriendshipByUserIds(long user1Id, long user2Id) {
        var sql = """
                SELECT *
                FROM friendships
                WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
                """;
        return jdbcTemplate.query(sql, new FriendshipRowMapper(), user1Id, user2Id, user2Id, user1Id)
                .stream()
                .findFirst();
    }

    @Override
    public boolean areUsersFriends(long user1Id, long user2Id) {
        var sql = """
                SELECT COUNT(*)
                FROM friendships
                WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, user1Id, user2Id, user2Id, user1Id);
        return count != null && count > 0;
    }

    @Override
    public int deleteFriendship(long user1Id, long user2Id) {
        var sql = """
                DELETE FROM friendships
                WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
                """;
        return jdbcTemplate.update(sql, user1Id, user2Id, user2Id, user1Id);
    }
}
