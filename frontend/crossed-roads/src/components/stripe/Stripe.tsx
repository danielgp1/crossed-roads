import { useState, useEffect } from "react";
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51NYs8EGHqyz7OOkIA0Sdr1zl4kpYB7xcyGngx20xDvf9oQtmGoOiefS6pb14dvMTLi7206Ygdc0gFSwEGRhKscDV00Mnv7qJC5");

interface StripeProps {
  selectedColor:string;
}


export default function Stripe({ selectedColor }: StripeProps) {
  const [clientSecret, setClientSecret] = useState("");
  const userID = localStorage.getItem("userID");
  const authToken = localStorage.getItem("userToken");
  useEffect(() => {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    axios
      .post(
        "http://10.16.6.25:8080/api/create-payment-intent",
        {
          user_id: Number(userID),
          color_hash: selectedColor,
          key: process.env.REACT_APP_STRIPE_KEY
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Successfully received client secret");
        console.log(response.data);
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.log("Couldn't submit order!");
      });
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe-body">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm selectedColor={selectedColor} />
        </Elements>
      )}
    </div>
  );
}