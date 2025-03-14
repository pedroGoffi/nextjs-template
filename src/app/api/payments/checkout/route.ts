import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia"
});

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Stripe usa centavos
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Falha ao criar sessão" }, { status: 500 });
  }
}
