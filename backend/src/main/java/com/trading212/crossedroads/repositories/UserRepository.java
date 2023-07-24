package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.UserDao;
import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.inputs.UserInput;
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
            return getUserByUsername(user.getProfile_name()).orElseThrow(() -> new IllegalStateException("Couldn't add user"));
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
    public Optional<User> getUserByUsername(String profile_name) {
        var sql = """
                SELECT *
                FROM users
                WHERE profile_name = ?
                """;
        return jdbcTemplate.query(sql, new UserRowMapper(), profile_name)
                .stream()
                .findFirst();
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
    public int deleteUser(long id) {
        var sql = """
                DELETE FROM users
                WHERE id = ?
                """;
        return jdbcTemplate.update(sql, id);
    }


}
