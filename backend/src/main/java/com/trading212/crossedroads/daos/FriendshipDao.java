package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Friendship;

import java.util.List;
import java.util.Optional;

public interface FriendshipDao {
    Friendship insertFriendship(Friendship friendship);

    List<Friendship> getFriendships();

    List<Friendship> getFriendshipsByUserId(long userId);

    Optional<Friendship> getFriendshipByUserIds(long user1Id, long user2Id);

    boolean areUsersFriends(long user1Id, long user2Id);

    int deleteFriendship(long user1Id, long user2Id);
}
