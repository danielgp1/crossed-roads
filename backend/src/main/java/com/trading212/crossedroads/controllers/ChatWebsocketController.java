package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ChatWebsocketController {
    @Autowired
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;

    public ChatWebsocketController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
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
        messageService.insertMessage(message);
    }
}
