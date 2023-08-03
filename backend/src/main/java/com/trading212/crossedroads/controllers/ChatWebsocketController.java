package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.dtos.User;
import com.trading212.crossedroads.inputs.UserInput;
import com.trading212.crossedroads.outputs.ChatOutput;
import com.trading212.crossedroads.services.ChatService;
import com.trading212.crossedroads.services.MessageService;
import com.trading212.crossedroads.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;

@Controller
public class ChatWebsocketController {
    @Autowired
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;
    private final ChatService chatService;
    private final UserService userService;

    public ChatWebsocketController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService, ChatService chatService, UserService userService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
        this.chatService = chatService;
        this.userService = userService;
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload Message message) {
        if (message == null) {
            throw new IllegalArgumentException("Message cannot be null");
        }
        long receiverId = message.getReceiver_id();
        long senderId = message.getSender_id();
        if (receiverId <= 0) {
            throw new IllegalArgumentException("Receiver ID cannot be null or less than or equal to zero");
        }

        simpMessagingTemplate.convertAndSendToUser(String.valueOf(receiverId), "/private", message);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(senderId), "/private", message);

        // Persist the message and update chat summary
        messageService.insertMessage(message);

        // Update chat summaries
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(receiverId), "/chat-summary", getChatSummaries(receiverId));
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(senderId), "/chat-summary", getChatSummaries(senderId));
    }

    private ConcurrentMap<Long, Long> lastHeartbeatTimes = new ConcurrentHashMap<>();

    @MessageMapping("/heartbeat")
    public void receiveHeartbeat(@Payload Long userId) {
        System.out.println("BEAT: userID " + userId.toString());
        System.out.println(new Date(System.currentTimeMillis()));
        if(!lastHeartbeatTimes.containsKey(userId)){
            System.out.println("REVIVED: userID " + userId.toString());
            userLoggedIn(userId);
        }
        lastHeartbeatTimes.put(userId, System.currentTimeMillis());
    }

    @Scheduled(fixedDelay = 15000)
    public void checkInactiveUsers() {
        System.out.println("CHECKING PULSE");
        System.out.println(new Date(System.currentTimeMillis()));
        long currentTime = System.currentTimeMillis();
        lastHeartbeatTimes.forEach((userId, lastHeartbeatTime) -> {
            if (currentTime - lastHeartbeatTime > 15000) {
                userLoggedOut(userId);
                System.out.println("DEAD: userID " + userId.toString());
                lastHeartbeatTimes.remove(userId);
            }
        });
    }

    @MessageMapping("/login")
    public void login(@Payload Long userId) {
        userLoggedIn(userId);
    }

    @MessageMapping("/logout")
    public void logout(@Payload Long userId) {
        userLoggedOut(userId);
    }


    public List<ChatOutput> getChatSummaries(long userId) {
        List<ChatOutput> chatOutputs = chatService.getChatSummariesByUserId(userId);

        // Return the chat summaries, sorted by the latest message time
        return chatOutputs.stream()
                .sorted((o1, o2) -> o2.getLatest_message_time().compareTo(o1.getLatest_message_time()))
                .collect(Collectors.toList());
    }


    public void userLoggedIn(long userId) {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(userId), "/online-status", true);
        updateUserOnlineStatus(userId, true);

        // Notify each friend of the user that the user has logged in
        List<User> friends = userService.getFriendsById(userId);
        Map<String, Object> friendStatus = new HashMap<>();
        friendStatus.put("friend_id", userId);
        friendStatus.put("status", true);
        for (User user : friends) {
            simpMessagingTemplate.convertAndSendToUser(String.valueOf(user.getId()), "/friend-online-status", friendStatus);
        }
    }

    // This should be triggered when a WebSocket connection with a user is closed
    public void userLoggedOut(long userId) {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(userId), "/online-status", false);
        updateUserOnlineStatus(userId, false);

        // Notify each friend of the user that the user has logged out
        List<User> friends = userService.getFriendsById(userId);
        Map<String, Object> friendStatus = new HashMap<>();
        friendStatus.put("friend_id", userId);
        friendStatus.put("status", false);
        for (User user : friends) {
            System.out.println(user.getProfile_name());
            simpMessagingTemplate.convertAndSendToUser(String.valueOf(user.getId()), "/friend-online-status", friendStatus);
        }
    }

    private void updateUserOnlineStatus(long userId, boolean isOnline) {
        UserInput userInput = new UserInput();
        userInput.setOnlineStatus(isOnline);
        userService.updateUser(userId, userInput);
    }
}
