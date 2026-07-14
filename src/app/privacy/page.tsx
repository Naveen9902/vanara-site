import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | VANARA',
  description: 'Vanara Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <main className="va-view active" style={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Privacy Policy</h1>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--river)', letterSpacing: '0.2em', marginBottom: '40px' }}>
          <span style={{ color: 'var(--bone-dim)', letterSpacing: '0.1em' }}>Last Updated: July 2026</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, join a waitlist, reserve an edition, or communicate with us. This may include your name, email address, shipping address, and payment information (processed securely by Stripe).</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>2. How We Use Your Information</h2>
            <p>We use the information we collect to process your transactions, communicate with you about your reservations, send updates regarding upcoming editions (if you have opted in), and improve our site and services.</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>3. Information Sharing</h2>
            <p>We do not sell your personal information. We share your information only with third-party service providers (like Stripe for payments and shipping carriers) necessary to fulfill your orders and operate our business.</p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)' }}>4. Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access. All payment information is encrypted and handled by PCI-compliant processors.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
