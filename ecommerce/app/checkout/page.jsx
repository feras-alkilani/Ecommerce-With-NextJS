"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")); // استلام المبلغ من معلمات البحث
  const amountInCents = Math.round(amount * 100); // تحويل المبلغ إلى سنتات

  const options = {
    mode: "payment",
    currency: "usd",
    amount: amountInCents
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} /> {/* تمرير المبلغ الأصلي (غير محول) */}
    </Elements>
  );
}

export default Checkout;
