package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.ChatDao;
import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final ChatDao chatDao;

    public ChatService(ChatDao chatDao) {
        this.chatDao = chatDao;
    }

    public Chat insertChat(Chat chat) {
        return chatDao.insertChat(chat);
    }

    public List<Chat> getAllChats() {
        return chatDao.getAllChats();
    }

    public Chat getChatById(long chatId) {
        return chatDao.getChatById(chatId)
                .orElseThrow(() -> new NotFoundException(String.format("Chat with id %d not found", chatId)));
    }

    public List<Chat> getChatsByUserId(long userId) {
        return chatDao.getChatsByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %d not found", userId)));
    }

    public void deleteChat(long chatId) {
        int rowsAffected = chatDao.deleteChat(chatId);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete chat");
        }
    }
}
