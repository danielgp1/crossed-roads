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
        Stripe.apiKey = "sk_test_51NYs8EGHqyz7OOkIjkG4r72mbMhAwIVmw1WGUPaB4SD9a2AQb3XdEMWjU1NsLlNG8UK5MpyXq7HYTOomEvxErtXs00TNBPHXx3";

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(500L)  // 5 BGN is represented as 500 in Stripe's API (it uses the smallest currency unit)
                        .setCurrency("bgn")
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        // Create a PaymentIntent with the order amount and currency
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return ResponseEntity.ok(new CreatePaymentResponse(paymentIntent.getClientSecret()));
    }
}