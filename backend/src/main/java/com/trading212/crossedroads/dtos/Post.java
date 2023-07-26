package com.trading212.crossedroads.dtos;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Post {
    private long post_id;
    private long user_id;
    private String content;
    private ZonedDateTime created_at;
    private ZonedDateTime updated_at;

    public Post(long user_id, String content) {
        this.user_id = user_id;
        this.content = content;
    }

    public Post() {

    }

    public Post(long post_id, long user_id, String content, ZonedDateTime created_at, ZonedDateTime updated_at) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
