package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.Message;

import java.util.List;
import java.util.Optional;

public interface MessageDao {
    Message insertMessage(Message message);

    List<Message> getAllMessages();
    Optional<Message> getMessageById(long messageId);
    Optional<List<Message>> getMessagesByChatId(long chatId);
    Optional<List<Message>> getMessagesBySenderId(long senderId);
    int deleteMessage(long messageId);
}
