import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret'
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

    // Create Razorpay Payment Link
    const paymentLink = await razorpay.paymentLink.create({
      amount: advanceAmount, // in cents/paise
      currency: 'USD',
      accept_partial: false,
      description: `VANARA Baiji Edition - Advance`,
      customer: {
        name: session.user.name || "Customer",
        email: session.user.email,
      },
      notify: {
        email: true,
        sms: false
      },
      reminder_enable: false,
      notes: {
        userId: (session.user as any).id,
        cartPayload: JSON.stringify(cartItems)
      },
      callback_url: `${origin}/success`,
      callback_method: 'get'
    });

    return NextResponse.json({ url: paymentLink.short_url });
  } catch (error: any) {
    console.error('Razorpay Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
