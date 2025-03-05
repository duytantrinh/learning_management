import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // check apiVersion https://dashboard.stripe.com/test/workbench/overview
  apiVersion: "2025-02-24.acacia",
  typescript: true,
})
