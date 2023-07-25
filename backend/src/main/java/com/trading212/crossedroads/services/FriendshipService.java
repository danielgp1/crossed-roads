package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.FriendshipDao;
import com.trading212.crossedroads.dtos.Friendship;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {
    private final FriendshipDao friendshipDao;

    public FriendshipService(FriendshipDao friendshipDao) {
        this.friendshipDao = friendshipDao;
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

    public Optional<Friendship> getFriendshipByUserIds(long user1Id, long user2Id) {
        return friendshipDao.getFriendshipByUserIds(user1Id, user2Id);
    }

    public void deleteFriendship(long user1Id, long user2Id) {
        int rowsAffected = friendshipDao.deleteFriendship(user1Id, user2Id);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete friendship");
        }
    }
}
