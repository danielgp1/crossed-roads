package com.trading212.crossedroads.dtos;

import lombok.Data;

@Data
public class Friendship {
    private long user1_id;
    private long user2_id;

    public Friendship() {
    }

    public Friendship(long user1_id, long user2_id) {
        this.user1_id = user1_id;
        this.user2_id = user2_id;
    }
}
