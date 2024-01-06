import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useAvailableColorsContext } from "../../contexts/AvailableColorsContext";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
    type: string,
    selectedColor: string;
    setVisible:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckoutForm({ type, selectedColor, setVisible }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addColor } = useAvailableColorsContext();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent!.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        if (type === "color") {
            await addColor(selectedColor);
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000/payment-success",
                },
            });

            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message as string);
            } else {
                setMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
        } else if (type === "bribe") {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000",
                },
            });

            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message as string);
            } else {
                setMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
        }


    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs"
    }

    const handleCancelPayment = (e: React.MouseEvent) => {
        e.preventDefault();
        if(type === "color") {
            navigate("/payment-fail");
        }
        else if (type === "bribe") {
            setVisible(false);
        }
    }

    return (  
        <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
            <button type="button" onClick={handleCancelPayment} className="cancel-payment">Cancel Payment</button>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className="stripe-button" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
        </form>
    );
}