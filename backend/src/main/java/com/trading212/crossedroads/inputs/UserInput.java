package com.trading212.crossedroads.inputs;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInput {
    private String oldPassword;
    private String newPassword;
    private String profilePicUrl;
    private String currentColor;
    private Boolean onlineStatus;
    private Double longitude;
    private Double latitude;

    @JsonCreator
    public UserInput(@JsonProperty("old_pass") String oldPassword,
                     @JsonProperty("new_pass") String newPassword,
                     @JsonProperty("profile_pic_url") String url,
                     @JsonProperty("current_color") String currentColor,
                     @JsonProperty("is_online") Boolean onlineStatus,
                     @JsonProperty("longitude") Double longitude,
                     @JsonProperty("latitude") Double latitude) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.profilePicUrl = url;
        this.currentColor = currentColor;
        this.onlineStatus = onlineStatus;
        this.longitude = longitude;
        this.latitude = latitude;
    }

}

