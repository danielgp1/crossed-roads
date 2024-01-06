package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Post;
import com.trading212.crossedroads.inputs.PostInput;
import com.trading212.crossedroads.outputs.PostOutput;
import com.trading212.crossedroads.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public Post insertPost(@RequestBody Post post) {
        return postService.insertPost(post);
    }

    @GetMapping
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable("postId") long postId) {
        return postService.getPostById(postId);
    }

    @GetMapping("/users/{userId}")
    public List<Post> getPostsByUserId(@PathVariable("userId") long userId) {
        return postService.getPostsByUserId(userId);
    }

    @GetMapping("/users/{userId}/friends-posts")
    public List<PostOutput> getPostsByFriends(@PathVariable("userId") long userId) {
        return postService.getPostsByFriends(userId);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable("postId") long postId) {
        postService.deletePost(postId);
    }

    @PutMapping("/{postId}")
    public void updatePostContent(@PathVariable("postId") long postId, @RequestBody PostInput postInput) {
        postService.updatePostContent(postId, postInput.getContent());
    }
}
