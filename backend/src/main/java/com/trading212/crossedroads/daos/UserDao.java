package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.dtos.Visit;
import com.trading212.crossedroads.inputs.UserInput;
import com.trading212.crossedroads.outputs.UserVisitorOutput;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    User insertUser(User user);

    List<User> getUsers();
    Optional<User> getUserByID(long id);
    Optional<List<User>>getFriendsById(long userId);
    Optional<List<UserVisitorOutput>> getVisitorsById(long userId);
    Optional<List<User>> getUsersByUsername(String profile_name);
    Optional<User> getUserByEmail(String email);
    int updateUserProfilePicUrl(long id, String url);
    int updateUserPassword(long id, String password);
    int updateCurrentColor(long id, String color);
    int deleteUser(long id);
}