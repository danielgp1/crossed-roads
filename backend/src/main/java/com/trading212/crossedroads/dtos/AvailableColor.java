package com.trading212.crossedroads.dtos;

import lombok.Data;

@Data
public class AvailableColor {
    private long user_id;
    private String color_hash;

    public AvailableColor() {
    }

    public AvailableColor(long user_id, String color_hash) {
        this.user_id = user_id;
        this.color_hash = color_hash;
    }
}
