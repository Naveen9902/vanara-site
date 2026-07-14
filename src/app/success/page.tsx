import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import Link from 'next/link';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia',
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    return (
      <main className="va-view active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <h1 className="serif" style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--brick)' }}>Invalid Session</h1>
        <p style={{ color: 'var(--bone-dim)', marginBottom: '24px' }}>We could not verify your payment session.</p>
        <Link href="/" className="va-btn">Return Home</Link>
      </main>
    );
  }

  if (session.payment_status !== 'paid') {
    return (
      <main className="va-view active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <h1 className="serif" style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--brick)' }}>Payment Pending</h1>
        <p style={{ color: 'var(--bone-dim)', marginBottom: '24px' }}>Your payment has not been completed yet.</p>
        <Link href="/shop" className="va-btn">Return to Shop</Link>
      </main>
    );
  }

  // Payment is successful! 
  // Let's create the reservation if it doesn't already exist for this session.
  const userId = session.metadata?.userId;
  const userName = session.metadata?.userName;
  const cartPayloadStr = session.metadata?.cartPayload;

  if (!userId || !cartPayloadStr) {
    return (
      <main className="va-view active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <h1 className="serif" style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--brick)' }}>Data Error</h1>
        <p style={{ color: 'var(--bone-dim)', marginBottom: '24px' }}>Reservation data was lost. Contact support.</p>
      </main>
    );
  }

  // Check if we already created a reservation for this exact Stripe session (idempotency)
  const existingReservation = await prisma.reservation.findFirst({
    where: { transactionId: sessionId }
  });

  if (!existingReservation) {
    try {
      const cartItems = JSON.parse(cartPayloadStr);
      const total = cartItems.reduce((sum: number, item: any) => sum + item.price, 0);

      await prisma.reservation.create({
        data: {
          name: userName || "Customer",
          email: session.customer_details?.email || "unknown@email.com",
          total: total,
          userId: userId,
          paymentMethod: 'stripe',
          transactionId: sessionId, // store the stripe session ID to prevent duplicates
          items: {
            create: cartItems.map((item: any) => ({
              size: item.size,
              editionNumber: String(item.num),
              price: item.price,
            })),
          },
        },
      });
    } catch (e) {
      console.error("Failed to insert reservation:", e);
    }
  }

  return (
    <main className="va-view active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-panel-2)', padding: '40px 60px', borderRadius: '12px', border: '1px solid var(--line)' }}>
        <h1 className="serif" style={{ fontSize: '42px', marginBottom: '12px', color: 'var(--bone)' }}>Secured.</h1>
        <p style={{ color: 'var(--river)', fontSize: '15px', marginBottom: '32px', fontFamily: "'IBM Plex Mono', monospace" }}>
          Payment received successfully.
        </p>
        <p style={{ color: 'var(--bone-dim)', maxWidth: '400px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Your limited edition piece is officially reserved under your name. We have recorded your edition number. You can view your reservation in your Account Dashboard.
        </p>
        <Link href="/account" className="va-btn primary" style={{ marginRight: '14px' }}>View Dashboard</Link>
        <Link href="/" className="va-btn">Return Home</Link>
      </div>
    </main>
  );
}
