package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.PostDao;
import com.trading212.crossedroads.dtos.Post;
import com.trading212.crossedroads.exceptions.NotFoundException;
import com.trading212.crossedroads.outputs.PostOutput;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostDao postDao;

    public PostService(PostDao postDao) {
        this.postDao = postDao;
    }

    public Post insertPost(Post post) {
        return postDao.insertPost(post);
    }

    public List<Post> getPosts() {
        return postDao.getPosts();
    }

    public Post getPostById(long postId) {
        return postDao.getPostById(postId)
                .orElseThrow(() -> new NotFoundException(String.format("Post with id %d not found", postId)));
    }

    public List<Post> getPostsByUserId(long userId) {
        return postDao.getPostsByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %d not found", userId)));
    }

    public List<PostOutput> getPostsByFriends(long userId) {
        return postDao.getPostsByFriends(userId);
    }

    public void deletePost(long postId) {
        int rowsAffected = postDao.deletePost(postId);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete post");
        }
    }

    public void updatePostContent(long postId, String content) {
        int rowsAffected = postDao.updatePostContent(postId, content);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't update post content");
        }
    }
}
