package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Post;
import com.trading212.crossedroads.outputs.PostOutput;

import java.util.List;
import java.util.Optional;

public interface PostDao {
    Post insertPost(Post post);

    List<Post> getPosts();

    Optional<List<Post>> getPostsByUserId(long userId);

    Optional<Post> getPostById(long postId);

    List<PostOutput> getPostsByFriends(long userId);

    int updatePostContent(long postId, String content);

    int deletePost(long postId);
}
