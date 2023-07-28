package com.trading212.crossedroads.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.trading212.crossedroads.dtos.CreatePayment;
import com.trading212.crossedroads.dtos.CreatePaymentResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @PostMapping(path = "/create-payment-intent", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {
        Stripe.apiKey = "sk_test_z6Wgj3W5n3eYSLEKPRJ4OrE900vpjOnFhP";

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

        CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret());
        return paymentResponse;
    }
}