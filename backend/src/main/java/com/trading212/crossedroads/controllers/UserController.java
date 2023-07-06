package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){this.userService = userService;}

    @GetMapping
    public List<User> getUsers(){return userService.getUsers();}

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") long id){return userService.getUser(id);}

    @PutMapping("/{id}")
    public void updateUser(@PathVariable("id") long id, @RequestBody User user){userService.updateUser(id, user);}

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id){userService.deleteUser(id);}
}
