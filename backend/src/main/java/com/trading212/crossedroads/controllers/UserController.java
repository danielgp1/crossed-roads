package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.inputs.UserInput;
import com.trading212.crossedroads.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){this.userService = userService;}

    @GetMapping
    public List<User> getUsers(){return userService.getUsers();}

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") long id){return userService.getUser(id);}

    @PutMapping("/{id}")
    public void updateUser(@PathVariable("id") long id, @RequestBody UserInput userInput){userService.updateUser(id, userInput);}

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id){userService.deleteUser(id);}
}
