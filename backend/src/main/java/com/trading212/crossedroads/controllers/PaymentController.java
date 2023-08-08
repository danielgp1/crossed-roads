package com.trading212.crossedroads.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.trading212.crossedroads.dtos.CreatePayment;
import com.trading212.crossedroads.dtos.CreatePaymentResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://10.16.6.25:3000", allowedHeaders = "*")
@RequestMapping(path = "/api/create-payment-intent")
public class PaymentController {

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreatePaymentResponse> createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {
        Stripe.apiKey = createPayment.getKey();
        long value = createPayment.getValue();
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(value*100)
                        .setCurrency("bgn")
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return ResponseEntity.ok(new CreatePaymentResponse(paymentIntent.getClientSecret()));
    }
}