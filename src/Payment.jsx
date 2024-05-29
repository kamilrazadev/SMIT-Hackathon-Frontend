import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { serverUrl } from "./utils/appConstants";

const stripePromise = loadStripe("pk_test_51PKCjmAOdkpgDOQiBNmLk8Ymd9YrUDguHhPUGTe9aJvJb0bnzo10s9c8O0YSUybZmMOJfqJleTPUG3Zw9Ums3awa005tQSAl0S");

const Payment = () => {
  const [sessionId, setSessionId] = useState(null);
  const [priceId, setPriceId] = useState("");

  const createCheckoutSession = async () => {
    const response = await fetch(
        `${serverUrl}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      }
    );

    const session = await response.json();
    console.log(session, "===>> session main kya mila");
    setSessionId(session.sessionId);
  };

  const handleClick = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <div>
      <h2>Stripe Payment</h2>
      <input
        type="text"
        placeholder="Enter Price ID"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <button onClick={createCheckoutSession}>Create Checkout Session</button>

      {sessionId && <button onClick={handleClick}>Go to Checkout</button>}
    </div>
  );
};

export default Payment;
