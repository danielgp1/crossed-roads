package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.outputs.ChatOutput;

import java.util.List;
import java.util.Optional;

public interface ChatDao {
    Chat insertChat(Chat chat);
    List<Chat> getAllChats();
    Optional<Chat> getChatById(long chatId);
    Optional<List<ChatOutput>> getChatSummariesByUserId(long userId);
    int getChatIdIfExists(long participant1Id, long participant2Id);
    int deleteChat(long chatId);
}
