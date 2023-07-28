package com.trading212.crossedroads.dtos;

import lombok.Data;

@Data
public class CreatePaymentResponse {
    private String clientSecret;


    public CreatePaymentResponse() {
    }

    public CreatePaymentResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
