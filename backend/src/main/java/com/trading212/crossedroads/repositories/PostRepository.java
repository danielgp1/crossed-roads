package com.trading212.crossedroads.repositories;

import com.trading212.crossedroads.daos.PostDao;
import com.trading212.crossedroads.dtos.Post;
import com.trading212.crossedroads.outputs.PostOutput;
import com.trading212.crossedroads.outputs.RowMappers.PostOutputRowMapper;
import com.trading212.crossedroads.row_mappers.PostRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PostRepository implements PostDao {
    private final JdbcTemplate jdbcTemplate;

    public PostRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Post insertPost(Post post) {
        var sql = """
                INSERT INTO posts(user_id, content)
                VALUES (?, ?)
                """;
        int rowsAffected = jdbcTemplate.update(sql, post.getUser_id(), post.getContent());
        if (rowsAffected > 0) {
            return post;
        } else {
            return null;
        }
    }

    @Override
    public List<Post> getPosts() {
        var sql = """
                SELECT *
                FROM posts
                """;
        return jdbcTemplate.query(sql, new PostRowMapper());
    }

    @Override
    public Optional<Post> getPostById(long postId) {
        var sql = """
                SELECT *
                FROM posts
                WHERE post_id = ?
                """;
        return jdbcTemplate.query(sql, new PostRowMapper(), postId)
                .stream()
                .findFirst();
    }

    @Override
    public List<PostOutput> getPostsByFriends(long userId) {
        var sql = """
                SELECT p.*, u.first_name, u.last_name, u.profile_pic_url
                FROM posts p
                JOIN friendships f ON (p.user_id = f.user1_id OR p.user_id = f.user2_id)
                JOIN users u ON p.user_id = u.id
                WHERE (f.user1_id = ? OR f.user2_id = ?) AND p.user_id != ?
                """;
        return jdbcTemplate.query(sql, new PostOutputRowMapper(), userId, userId, userId);
    }


    @Override
    public Optional<List<Post>> getPostsByUserId(long userId) {
        var sql = """
                SELECT *
                FROM posts
                WHERE user_id = ?
                """;
        List<Post> posts = jdbcTemplate.query(sql, new PostRowMapper(), userId);
        return Optional.of(posts);
    }

    @Override
    public int updatePostContent(long postId, String content) {
        var sql = """
                UPDATE posts
                SET content = ?
                WHERE post_id = ?
                """;
        return jdbcTemplate.update(sql, content, postId);
    }

    @Override
    public int deletePost(long postId) {
        var sql = """
                DELETE FROM posts
                WHERE post_id = ?
                """;
        return jdbcTemplate.update(sql, postId);
    }
}
