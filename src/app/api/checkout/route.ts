import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Initialize Stripe (will throw if key is missing, but we handle it gracefully if undefined)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-06-24.dahlia',
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'You must be logged in to reserve.' }, { status: 401 });
    }

    const { cartItems } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Enforce 1 reservation limit per user
    const existingOrder = await prisma.reservation.findFirst({
      where: { userId: (session.user as any).id }
    });

    if (existingOrder) {
      return NextResponse.json({ error: 'Limit exceeded: You have already reserved a piece.' }, { status: 403 });
    }

    // Determine absolute URL for redirect
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // The advance is always $10 USD per piece
    const advanceAmount = 10 * 100; // in cents

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `VANARA Baiji Edition - Size ${item.size} (No. ${item.num}/200)`,
          description: 'Advance payment to secure reservation. Balance due prior to shipping.',
        },
        unit_amount: advanceAmount,
      },
      quantity: 1,
    }));

    // Create Checkout Sessions from body params.
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      customer_email: session.user.email,
      metadata: {
        userId: (session.user as any).id,
        userName: session.user.name || "Customer",
        cartPayload: JSON.stringify(cartItems)
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
