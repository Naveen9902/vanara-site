import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | VANARA',
  description: 'Vanara Terms of Service',
};

export default function TermsPage() {
  return (
    <main className="va-view active" style={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Terms of Service</h1>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--river)', letterSpacing: '0.2em', marginBottom: '40px' }}>
          <span style={{ color: 'var(--bone-dim)', letterSpacing: '0.1em' }}>Last Updated: July 2026</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>1. General</h2>
            <p>By accessing or using the Vanara website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>2. Products and Scarcity</h2>
            <p>All editions are strictly limited in number. Reserving a piece requires a non-refundable deposit. Once a run is sold out, it is retired permanently. We reserve the right to limit the sales of our products to any person or geographic region.</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>3. Pricing and Payments</h2>
            <p>Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service without notice at any time. All payments are securely processed by Razorpay.</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>4. Returns and Exchanges</h2>
            <p>Due to the extremely limited nature of our editions, we generally cannot guarantee size exchanges. All sales are considered final unless the product arrives defective or damaged, in which case you must contact us within 14 days of receipt.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
