package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Chat;

import java.util.List;
import java.util.Optional;

public interface ChatDao {
    Chat insertChat(Chat chat);

    List<Chat> getAllChats();
    Optional<Chat> getChatById(long chatId);
    Optional<List<Chat>> getChatsByUserId(long userId);
    int deleteChat(long chatId);
}
