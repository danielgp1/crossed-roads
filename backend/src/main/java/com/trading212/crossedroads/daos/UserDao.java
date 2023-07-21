package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    User insertUser(User user);

    List<User> getUsers();
    Optional<User> getUserByID(long id);
    Optional<User> getUserByUsername(String profile_name);

    Optional<User> getUserByEmail(String email);

    int updateUser(long id, User user);
    int deleteUser(long id);
}