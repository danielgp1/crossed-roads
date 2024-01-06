import { useState, useEffect } from "react";
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51OVeg4KlGfwKnsf1LpwB8HM0SOpDOXd16Dt7jzTLdjs4w7uGlJ755ecDKxG1tPbOeldupcfh1JTKpMmuVLQYE18u00IipGOE5Z");

interface StripeProps {
  type: string;
  setVisible?:React.Dispatch<React.SetStateAction<boolean>>;
  selectedColor?:string;
}


export default function Stripe({ type, selectedColor, setVisible }: StripeProps) {
  const [clientSecret, setClientSecret] = useState("");
  const userID = localStorage.getItem("userID");
  const authToken = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/api/create-payment-intent",
        {
          user_id: Number(userID),
          value: type === "color" ? 5 : 20,
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
          <CheckoutForm type={type} selectedColor={selectedColor!} setVisible={setVisible!}/>
        </Elements>
      )}
    </div>
  );
}