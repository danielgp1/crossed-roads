package com.trading212.crossedroads.controllers;

import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.services.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public Message insertMessage(@RequestBody Message message) {
        return messageService.insertMessage(message);
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{messageId}")
    public Message getMessageById(@PathVariable("messageId") long messageId) {
        return messageService.getMessageById(messageId);
    }

    @GetMapping("/chats/{chatId}")
    public List<Message> getMessagesByChatId(@PathVariable("chatId") long chatId) {
        return messageService.getMessagesByChatId(chatId);
    }

    @GetMapping("/senders/{senderId}")
    public List<Message> getMessagesBySenderId(@PathVariable("senderId") long senderId) {
        return messageService.getMessagesBySenderId(senderId);
    }

    @DeleteMapping("/{messageId}")
    public void deleteMessage(@PathVariable("messageId") long messageId) {
        messageService.deleteMessage(messageId);
    }
}
