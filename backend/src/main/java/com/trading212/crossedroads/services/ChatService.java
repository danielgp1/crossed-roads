package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.ChatDao;
import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.exceptions.NotFoundException;
import com.trading212.crossedroads.outputs.ChatOutput;
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

    public List<ChatOutput> getChatSummariesByUserId(long userId) {
        return chatDao.getChatSummariesByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %d not found", userId)));
    }

    public int getChatIdIfExists(long participant1Id, long participant2Id) {
        return chatDao.getChatIdIfExists(participant1Id, participant2Id);
    }

    public void deleteChat(long chatId) {
        int rowsAffected = chatDao.deleteChat(chatId);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete chat");
        }
    }
}
