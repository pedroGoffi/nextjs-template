import Stripe from "stripe";


const key = process.env.STRIPE_SECRET_KEY as string 
const stripeConfig: Stripe.StripeConfig = {
    apiVersion: "2025-02-24.acacia",        
}

export const stripe = new Stripe(key, stripeConfig)