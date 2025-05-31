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
      const response = await axios.post(checkOutUrls.getPaymentIntent, payLoad);

      if(response.error){
        onPaymentError();
      }
      // Step 2: Confirm the payment on frontend using client secret from backend
      const result = await stripe.confirmCardPayment(response.data.clientSecret, {
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
            onPaymentSuccess(result.paymentIntent);
        }
      }
    } catch (error) {
      onPaymentError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
        <div className="checkout-form-card-element">
            <CardElement options={{ hidePostalCode: true }} />
        </div>
        <div className="checkout-form-button">
            <button className="btn btn-success" type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing, please wait..." : "Pay Now"}
      </button>
    
        </div>
    </form>
  );
};

export default CheckOutForm;
