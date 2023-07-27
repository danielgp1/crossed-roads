package com.trading212.crossedroads.outputs;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class UserVisitorOutput {
        private long id;
        private String first_name;
        private String last_name;
        private String profile_name;
        private String profile_pic_url;
        private ZonedDateTime visited_at;
        public UserVisitorOutput() { }

    public UserVisitorOutput(long id, String first_name, String last_name, String profile_name, String profile_pic_url, ZonedDateTime visited_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_name = profile_name;
        this.profile_pic_url = profile_pic_url;
        this.visited_at = visited_at;
    }
}
