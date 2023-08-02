package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.outputs.ChatOutput;
import com.trading212.crossedroads.services.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://10.16.6.25:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/chats")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Chat insertChat(@RequestBody Chat chat) {
        return chatService.insertChat(chat);
    }

    @GetMapping
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{chatId}")
    public Chat getChatById(@PathVariable("chatId") long chatId) {
        return chatService.getChatById(chatId);
    }

    @GetMapping("/users/{userId}")
    public List<ChatOutput> getChatSummariesByUserId(@PathVariable("userId") long userId) {
        return chatService.getChatSummariesByUserId(userId);
    }
    @GetMapping("/exists/{participant1Id}/{participant2Id}")
    public int getChatIdIfExists(@PathVariable("participant1Id") long participant1Id, @PathVariable("participant2Id") long participant2Id) {
        return chatService.getChatIdIfExists(participant1Id, participant2Id);
    }
    @DeleteMapping("/{chatId}")
    public void deleteChat(@PathVariable("chatId") long chatId) {
        chatService.deleteChat(chatId);
    }
}
