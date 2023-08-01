package com.trading212.crossedroads.dtos;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Message {
    private long message_id;
    private long sender_id;
    private long receiver_id;
    private String content;
    private ZonedDateTime created_at;

    public Message() {

    }

    public Message(long message_id, long sender_id, long receiver_id, String content, ZonedDateTime created_at) {
        this.message_id = message_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.content = content;
        this.created_at = created_at;
    }
}
