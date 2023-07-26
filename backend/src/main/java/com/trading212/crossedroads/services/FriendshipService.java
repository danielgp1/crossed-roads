package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.FriendshipDao;
import com.trading212.crossedroads.daos.UserDao;
import com.trading212.crossedroads.dtos.Friendship;
import com.trading212.crossedroads.dtos.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {
    private final FriendshipDao friendshipDao;
    private final UserDao userDao;

    public FriendshipService(FriendshipDao friendshipDao, UserDao userDao) {
        this.friendshipDao = friendshipDao;
        this.userDao = userDao;
    }

    public Friendship insertFriendship(Friendship friendship) {
        return friendshipDao.insertFriendship(friendship);
    }

    public List<Friendship> getFriendships() {
        return friendshipDao.getFriendships();
    }

    public List<Friendship> getFriendshipsByUserId(long userId) {
        return friendshipDao.getFriendshipsByUserId(userId);
    }

    public List<User> getFriendsByUserId(long userId) {
        List<Friendship> friendships = friendshipDao.getFriendshipsByUserId(userId);
        List<User> friends = new ArrayList<>();
        for (Friendship friendship : friendships) {
            long friendId = friendship.getUser1_id() == userId ? friendship.getUser2_id() : friendship.getUser1_id();
            Optional<User> friend = userDao.getUserByID(friendId);
            friend.ifPresent(friends::add);
        }
        return friends;
    }

    public Optional<Friendship> getFriendshipByUserIds(long user1Id, long user2Id) {
        return friendshipDao.getFriendshipByUserIds(user1Id, user2Id);
    }

    public boolean areUsersFriends(long user1Id, long user2Id) {
        return friendshipDao.areUsersFriends(user1Id, user2Id);
    }

    public void deleteFriendship(long user1Id, long user2Id) {
        int rowsAffected = friendshipDao.deleteFriendship(user1Id, user2Id);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete friendship");
        }
    }
}
