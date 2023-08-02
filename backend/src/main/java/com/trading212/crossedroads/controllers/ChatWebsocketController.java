package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.outputs.ChatOutput;
import com.trading212.crossedroads.services.ChatService;
import com.trading212.crossedroads.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ChatWebsocketController {
    @Autowired
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;
    private final ChatService chatService;

    public ChatWebsocketController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService, ChatService chatService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
        this.chatService = chatService;
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


    public List<ChatOutput> getChatSummaries(long userId) {
        List<ChatOutput> chatOutputs = chatService.getChatSummariesByUserId(userId);

        // Return the chat summaries, sorted by the latest message time
        return chatOutputs.stream()
                .sorted((o1, o2) -> o2.getLatest_message_time().compareTo(o1.getLatest_message_time()))
                .collect(Collectors.toList());
    }




}
