package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Friendship;
import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.services.FriendshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/friendships")
public class FriendshipController {
    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @PostMapping
    public Friendship insertFriendship(@RequestBody Friendship friendship) {
        return friendshipService.insertFriendship(friendship);
    }

    @GetMapping
    public List<Friendship> getFriendships() {
        return friendshipService.getFriendships();
    }

    @GetMapping("/users/{userId}")
    public List<Friendship> getFriendshipsByUserId(@PathVariable("userId") long userId) {
        return friendshipService.getFriendshipsByUserId(userId);
    }

    @GetMapping("/users/{user1Id}/{user2Id}")
    public Optional<Friendship> getFriendshipByUserIds(@PathVariable("user1Id") long user1Id, @PathVariable("user2Id") long user2Id) {
        return friendshipService.getFriendshipByUserIds(user1Id, user2Id);
    }

    @GetMapping("/users/{userId}/friends")
    public List<User> getFriendsByUserId(@PathVariable("userId") long userId) {
        return friendshipService.getFriendsByUserId(userId);
    }

    @GetMapping("/users/{user1Id}/friends/{user2Id}")
    public boolean areUsersFriends(@PathVariable("user1Id") long user1Id, @PathVariable("user2Id") long user2Id) {
        return friendshipService.areUsersFriends(user1Id, user2Id);
    }

    @DeleteMapping("/users/{user1Id}/{user2Id}")
    public void deleteFriendship(@PathVariable("user1Id") long user1Id, @PathVariable("user2Id") long user2Id) {
        friendshipService.deleteFriendship(user1Id, user2Id);
    }
}
