package com.trading212.crossedroads.dtos;

import lombok.Data;

@Data
public class CreatePayment {
    private long user_id;
    private long value;
    private String key;

    public CreatePayment() {
    }

    public CreatePayment(long user_id, long value, String color_hash, String key) {
        this.user_id = user_id;
        this.value = value;
        this.key = key;
    }
}
