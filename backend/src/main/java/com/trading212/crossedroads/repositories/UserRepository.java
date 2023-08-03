package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.UserDao;
import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.outputs.RowMappers.UserVisitorRowMapper;
import com.trading212.crossedroads.outputs.UserVisitorOutput;
import com.trading212.crossedroads.row_mappers.UserRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    public UserRepository(JdbcTemplate jdbcTemplate){this.jdbcTemplate = jdbcTemplate;}

    @Override
    public User insertUser(User user) {
        var sql = """
                INSERT INTO users(first_name, last_name, profile_name, password, email, date_of_birth)
                VALUES (?, ?, ?, ?, ?, ?);
                """;
        int rowsAffected = jdbcTemplate.update(sql, user.getFirst_name(), user.getLast_name(), user.getProfile_name(), user.getPassword(), user.getEmail(), user.getDate_of_birth());
        if (rowsAffected > 0) {
            List<User> users = getUsersByUsername(user.getProfile_name()).orElseThrow(() -> new IllegalStateException("Couldn't add user"));
            if (!users.isEmpty()) {
                return users.get(0);
            } else {
                throw new IllegalStateException("User not found after insertion");
            }
        } else {
            return null;
        }
    }

    @Override
    public List<User> getUsers() {
        var sql = """
                SELECT *
                FROM users
                LIMIT 100;
                """;
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    @Override
    public Optional<User> getUserByID(long id) {
        var sql = """
                SELECT *
                FROM users
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, new UserRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<List<User>> getFriendsById(long userId) {
        var sql = """
                SELECT u.*
                FROM users u
                JOIN friendships f ON u.id = f.user2_id OR u.id = f.user1_id
                WHERE (f.user1_id = ? OR f.user2_id = ?) AND u.id != ?
                """;
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), userId, userId, userId);
        return Optional.of(users);
    }

    @Override
    public Optional<List<UserVisitorOutput>> getVisitorsById(long userId) {
        var sql = """
                SELECT u.id, u.first_name, u.last_name, u.profile_name, u.profile_pic_url, v.visited_at
                FROM users u
                JOIN visits v ON u.id = v.visitor_id
                WHERE v.visited_id = ?
                """;
        List<UserVisitorOutput> visitors = jdbcTemplate.query(sql, new UserVisitorRowMapper(), userId);
        return Optional.of(visitors);
    }

    @Override
    public Optional<List<User>> getUsersByUsername(String profile_name) {
        var sql = """
                SELECT *
                FROM users
                WHERE profile_name LIKE CONCAT('%', ?, '%')
                """;
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), profile_name);
        return Optional.of(users);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        var sql = """
                SELECT *
                FROM users
                WHERE email = ?
                """;
        return jdbcTemplate.query(sql, new UserRowMapper(), email)
                .stream()
                .findFirst();
    }

    @Override
    public int updateUserProfilePicUrl(long id, String url) {
        var sql = """
            UPDATE users
            SET profile_pic_url = ?
            WHERE id = ?
            """;
        return jdbcTemplate.update(sql, url, id);
    }

    @Override
    public int updateLatLng(long id, double lat, double lng) {
        var sql = """
            UPDATE users
            SET latitude = ?, longitude = ?
            WHERE id = ?
            """;
        return jdbcTemplate.update(sql, lat, lng, id);
    }

    @Override
    public int updateUserPassword(long id, String password) {
        var sql = """
            UPDATE users
            SET password = ?
            WHERE id = ?
            """;
        return jdbcTemplate.update(sql, password, id);
    }

    @Override
    public int updateCurrentColor(long id, String color) {
        var sql = """
            UPDATE users
            SET current_color = ?
            WHERE id = ?
            """;
        return jdbcTemplate.update(sql, color, id);
    }

    @Override
    public int updateOnlineStatus(long id, boolean isOnline) {
        var sql = """
            UPDATE users
            SET is_online = ?
            WHERE id = ?
            """;
        return jdbcTemplate.update(sql, isOnline, id);
    }

    @Override
    public boolean getUserOnlineStatus(long id) {
        var sql = """
                SELECT is_online
                FROM users
                WHERE id = ?
                """;
        Boolean status = jdbcTemplate.queryForObject(sql, Boolean.class, id);
        return Optional.ofNullable(status).orElse(false);
    }

    @Override
    public int deleteUser(long id) {
        var sql = """
                DELETE FROM users
                WHERE id = ?
                """;
        return jdbcTemplate.update(sql, id);
    }


}
