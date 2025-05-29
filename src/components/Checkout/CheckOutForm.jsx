import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { checkOutUrls } from "../../urls/urls";
import './CheckOutForm.css'

const CheckOutForm = ({ payLoad, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Step 1: Call your backend to create a PaymentIntent
      const { data } = await axios.post(checkOutUrls.getPaymentIntent, payLoad);

      // Step 2: Confirm the payment on frontend using client secret from backend
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: payLoad.name,
            email: payLoad.email,
          },
        },
      });

      if (result.error) {
        onPaymentError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
            console.log("Success: "+result)
          onPaymentSuccess(result.paymentIntent);
        }
      }
    } catch (error) {
      onPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
        <div className="checkout-form-card-element">
            <CardElement options={{ hidePostalCode: true }} />
        </div>
        <div className="checkout-form-button">
            <button className="btn btn-success" type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    
        </div>
    </form>
  );
};

export default CheckOutForm;
