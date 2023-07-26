package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Post;

import java.util.List;
import java.util.Optional;

public interface PostDao {
    Post insertPost(Post post);

    List<Post> getPosts();
    Optional<List<Post>> getPostsByUserId(long userId);
    Optional<Post> getPostById(long postId);
    int updatePostContent(long postId, String content);
    int deletePost(long postId);
}
