"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

export default function Checkout() {
  // Replace with your application ID and location ID
  // const appId = process.env.SQUARE_APPLICATION_ID;
  const appId = 'sandbox-sq0idb-eFWIML_iUHk3zklfjNUKFw';
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}