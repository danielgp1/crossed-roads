package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.MessageDao;
import com.trading212.crossedroads.dtos.Chat;
import com.trading212.crossedroads.dtos.Message;
import com.trading212.crossedroads.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageDao messageDao;
    private final ChatService chatService;

    public MessageService(MessageDao messageDao, ChatService chatService) {
        this.messageDao = messageDao;
        this.chatService = chatService;
    }

    public Message insertMessage(Message message) {
        long chatId = chatService.getChatIdIfExists(message.getSender_id(), message.getReceiver_id());

        if(chatId == -1) {
            Chat newChat = new Chat();
            newChat.setParticipant1_id(message.getSender_id());
            newChat.setParticipant2_id(message.getReceiver_id());

            chatService.insertChat(newChat);
            int newChatID = chatService.getChatIdIfExists(message.getSender_id(), message.getReceiver_id());
            message.setChat_id(newChatID);
        } else {
            message.setChat_id(chatId);
        }

        return messageDao.insertMessage(message);
    }

    public List<Message> getAllMessages() {
        return messageDao.getAllMessages();
    }

    public Message getMessageById(long messageId) {
        return messageDao.getMessageById(messageId)
                .orElseThrow(() -> new NotFoundException(String.format("Message with id %d not found", messageId)));
    }
    public List<Message> getChatMessages(long user1_id, long user2_id) {
        return messageDao.getChatMessages(user1_id, user2_id)
                .orElseThrow(() -> new NotFoundException(String.format("No messages found between users %d and %d", user1_id, user2_id)));
    }

    public List<Message> getMessagesBySenderId(long senderId) {
        return messageDao.getMessagesBySenderId(senderId)
                .orElseThrow(() -> new NotFoundException(String.format("Sender with id %d not found", senderId)));
    }

    public void deleteMessage(long messageId) {
        int rowsAffected = messageDao.deleteMessage(messageId);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete message");
        }
    }

}
