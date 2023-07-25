package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.AvailableColorDao;
import com.trading212.crossedroads.daos.UserDao;
import com.trading212.crossedroads.dtos.AvailableColor;
import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.exceptions.NotFoundException;
import com.trading212.crossedroads.inputs.UserInput;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserDao userDao;
    private final AvailableColorDao availableColorDao;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, PasswordEncoder passwordEncoder, AvailableColorDao availableColorDao) {
        this.userDao = userDao;
        this.availableColorDao = availableColorDao;
        this.passwordEncoder = passwordEncoder;
    }

    public User insertUser(User user) {
        user.setProfile_name(generateUniqueUsername(user.getFirst_name(), user.getLast_name()));
        User insertedUser = userDao.insertUser(user);
        if (insertedUser == null) {
            throw new IllegalStateException("Couldn't add user");
        }
        availableColorDao.insertAvailableColor(new AvailableColor(insertedUser.getId(), "#FFFFFF"));
        return insertedUser;
    }

    public List<User> getUsers() {
        return userDao.getUsers();
    }

    public User getUser(long id) {
        return userDao.getUserByID(id)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %d not found", id)));
    }

    public List<User> getUsersByUsername(String username) {
        return userDao.getUsersByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Users with username %s not found", username)));
    }

    public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email)
                .orElseThrow(() -> new NotFoundException(String.format("User with email %s not found", email)));
    }

    public void updateUser(long id, UserInput userInput) {
        Optional<User> user = userDao.getUserByID(id);
        if (user.isEmpty()) {
            throw new NotFoundException(String.format("User with id %s not found", id));
        }
        if (userInput.getNewPassword() != null && userInput.getOldPassword() != null) {
            // validate passwords
            userDao.updateUserPassword(id, passwordEncoder.encode(userInput.getNewPassword()));
        }
        if (userInput.getProfilePicUrl() != null) {
            userDao.updateUserProfilePicUrl(id, userInput.getProfilePicUrl());
        }
        if (userInput.getCurrentColor() != null) {
            userDao.updateCurrentColor(id, userInput.getCurrentColor());
        }
    }

    public void deleteUser(long id) {
        Optional<User> user = userDao.getUserByID(id);
        if (user.isPresent()) {
            int res = userDao.deleteUser(id);
            if (res != 1) {
                throw new IllegalStateException("Couldn't delete user");
            }
        } else {
            throw new NotFoundException(String.format("User with id %s not found", id));
        }
    }

    private String generateUniqueUsername(String first_name, String last_name) {
        String baseUsername = first_name.toLowerCase() + last_name.toLowerCase();
        Random random = new Random();
        String username = baseUsername + "#" + (random.nextInt(9000) + 1000);
        while (isUserPresent(username)) {
            username = baseUsername + "#" + (random.nextInt(9000) + 1000);
        }

        return username;
    }

    private boolean isUserPresent(String username) {
        Optional<List<User>> usersOptional = userDao.getUsersByUsername(username);
        return usersOptional.map(users -> !users.isEmpty()).orElse(false);
    }

}
