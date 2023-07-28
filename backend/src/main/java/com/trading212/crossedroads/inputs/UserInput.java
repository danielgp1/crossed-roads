package com.trading212.crossedroads.inputs;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
    public class UserInput {
        private final String oldPassword;
        private final String newPassword;
        private final String profilePicUrl;
        private final String currentColor;
        private final Double longitude;
        private final Double latitude;
        @JsonCreator
        public UserInput(@JsonProperty("old_pass") String oldPassword,
                         @JsonProperty("new_pass") String newPassword,
                         @JsonProperty("profile_pic_url") String url,
                         @JsonProperty("current_color") String currentColor,
                         @JsonProperty("longitude")  Double longitude,
                         @JsonProperty("latitude")  Double latitude){
            this.oldPassword = oldPassword;
            this.newPassword = newPassword;
            this.profilePicUrl = url;
            this.currentColor = currentColor;
            this.longitude = longitude;
            this.latitude = latitude;
        }
    }

