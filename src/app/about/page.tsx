import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | VANARA',
  description: 'The story behind VANARA field records and our mission to create limited edition, hand-stamped sneakers.',
};

export default function AboutPage() {
  return (
    <main className="va-view active" style={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: '40px' }}>The Record.</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
          
          <section>
            <h2 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--river)' }}>Our Philosophy</h2>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '20px' }}>
              We started VANARA with a simple, stark realization: the natural world is quietly losing its masterpieces. Every year, unique species vanish, relegated to textbooks and faded photographs. 
            </p>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              We wanted to create a physical record of what was lost. We design ultra-limited, premium sneakers, where each silhouette and colorway is a tribute to an extinct species. We call these our "Field Records." 
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--river)' }}>The Process</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-panel-2)', padding: '24px', border: '1px solid var(--line)', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--bone)' }}>Hand-Numbered</h3>
                <p style={{ color: 'var(--bone-dim)', fontSize: '13px', lineHeight: '1.6' }}>Every single pair is hand-stamped with its unique edition number in our studio before shipping. 1 of 200 means exactly that.</p>
              </div>
              <div style={{ background: 'var(--bg-panel-2)', padding: '24px', border: '1px solid var(--line)', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--bone)' }}>Never Restocked</h3>
                <p style={{ color: 'var(--bone-dim)', fontSize: '13px', lineHeight: '1.6' }}>Once an edition sells out, the blueprints are destroyed. We will never reissue, restock, or recreate a past Field Record.</p>
              </div>
            </div>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              We use only premium, sustainable materials. We don't believe in fast fashion; we believe in creating durable artifacts that tell a story.
            </p>
          </section>

          <section style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '40px' }}>
            <h2 className="serif" style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--bone)' }}>Contact & Policies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
              <div>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--river)', marginBottom: '12px' }}>Business Registration</h4>
                <p style={{ color: 'var(--bone-dim)', fontSize: '14px', lineHeight: '1.6' }}>
                  Vanara LLC.<br/>
                  124 Broad St.<br/>
                  New York, NY 10004<br/>
                  United States
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--river)', marginBottom: '12px' }}>Customer Support</h4>
                <p style={{ color: 'var(--bone-dim)', fontSize: '14px', lineHeight: '1.6' }}>
                  Need help with a reservation or sizing?<br/>
                  <a href="mailto:support@vanara.com" style={{ color: 'var(--bone)', textDecoration: 'underline' }}>support@vanara.com</a>
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--river)', marginBottom: '12px' }}>Returns & Exchanges</h4>
                <p style={{ color: 'var(--bone-dim)', fontSize: '14px', lineHeight: '1.6' }}>
                  Unworn pairs can be returned within 14 days of delivery. Because our runs are strictly limited, direct size exchanges are subject to availability.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
