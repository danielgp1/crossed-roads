package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.outputs.UserVisitorOutput;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    User insertUser(User user);

    List<User> getUsers();

    Optional<User> getUserByID(long id);

    Optional<List<User>> getFriendsById(long userId);

    Optional<List<UserVisitorOutput>> getVisitorsById(long userId);

    Optional<List<User>> getUsersByUsername(String profile_name);

    Optional<User> getUserByEmail(String email);

    int updateUserProfilePicUrl(long id, String url);

    int updateLatLng(long id, double lat, double lng);

    int updateUserPassword(long id, String password);

    int updateCurrentColor(long id, String color);

    int updateOnlineStatus(long id, boolean isOnline);

    boolean getUserOnlineStatus(long id);

    int deleteUser(long id);
}