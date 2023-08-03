package com.trading212.crossedroads.outputs;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class ChatOutput {
    private long chat_id;
    private long participant1_id;
    private long participant2_id;
    private String latest_message_content;
    private long latest_message_sender_id;
    private ZonedDateTime latest_message_time;
    private boolean friend_online;

    public ChatOutput() {
    }

    public ChatOutput(long chat_id, long participant1_id, long participant2_id, String latest_message_content, long latest_message_sender_id , ZonedDateTime latest_message_time, boolean friend_online) {
        this.chat_id = chat_id;
        this.participant1_id = participant1_id;
        this.participant2_id = participant2_id;
        this.latest_message_content = latest_message_content;
        this.latest_message_sender_id = latest_message_sender_id;
        this.latest_message_time = latest_message_time;
        this.friend_online = friend_online;
    }
}




