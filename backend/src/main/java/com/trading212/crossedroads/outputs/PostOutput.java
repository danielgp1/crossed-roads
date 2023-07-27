package com.trading212.crossedroads.outputs;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class PostOutput {
    private long post_id;
    private long user_id;
    private String first_name;
    private String last_name;
    private String profile_pic_url;
    private String content;
    private ZonedDateTime created_at;
    private ZonedDateTime updated_at;


    public PostOutput() {
    }

    public PostOutput(long post_id, long user_id, String first_name, String last_name, String profile_pic_url, String content, ZonedDateTime created_at, ZonedDateTime updated_at) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_pic_url = profile_pic_url;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}



