package com.trading212.crossedroads.dtos;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Chat {
    private long chat_id;
    private long participant1_id;
    private long participant2_id;
    private ZonedDateTime created_at;
    private ZonedDateTime updated_at;

    public Chat() {

    }

    public Chat(long chat_id, long participant1_id, long participant2_id, ZonedDateTime created_at, ZonedDateTime updated_at) {
        this.chat_id = chat_id;
        this.participant1_id = participant1_id;
        this.participant2_id = participant2_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
