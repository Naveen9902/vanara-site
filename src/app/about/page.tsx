import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Profile | VANARA',
  description: 'Vanara is a footwear label built around a single idea: some things exist only once. Every release is named for a species the world has lost.',
};

export default function AboutPage() {
  return (
    <main className="va-view active" style={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VANARA</h1>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--river)', letterSpacing: '0.2em', marginBottom: '40px' }}>
          F I E L D &nbsp;&nbsp; R E C O R D S<br/>
          <span style={{ color: 'var(--bone-dim)', letterSpacing: '0.1em' }}>Company Profile</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px' }}>
          
          {/* ABOUT VANARA */}
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Vanara</h2>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '16px' }}>
              Vanara is a footwear label built around a single idea: some things exist only once. Every release is named for a species the world has lost, produced in one numbered run, and never remade. Each pair is hand-stamped with its edition number, turning a sneaker into a small, permanent record of something that can no longer be replaced.
            </p>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              The brand's debut release, Field Record No. 01 — The Baiji Edition, is limited to 200 numbered pairs worldwide, named for the Yangtze River dolphin declared functionally extinct in 2006.
            </p>
          </section>

          {/* FOUNDER & CONTACT */}
          <section style={{ background: 'var(--bg-panel-2)', padding: '30px', border: '1px solid var(--line)', borderRadius: '8px' }}>
            <h2 className="serif" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--river)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founder & Contact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px' }}>
              <div style={{ color: 'var(--bone-dim)' }}>Founder</div>
              <div style={{ color: 'var(--bone)' }}>Naveen Pagadekalla</div>
              
              <div style={{ color: 'var(--bone-dim)' }}>Business</div>
              <div style={{ color: 'var(--bone)' }}>Vanara — Field Records</div>
              
              <div style={{ color: 'var(--bone-dim)' }}>Location</div>
              <div style={{ color: 'var(--bone)' }}>Bengaluru, Karnataka, India</div>
              
              <div style={{ color: 'var(--bone-dim)' }}>Phone</div>
              <div style={{ color: 'var(--bone)' }}>+91 93804 65969</div>
              
              <div style={{ color: 'var(--bone-dim)' }}>Website</div>
              <div style={{ color: 'var(--bone)' }}><a href="https://vanara-site.vercel.app" style={{ color: 'inherit', textDecoration: 'underline' }}>vanara-site.vercel.app</a></div>
            </div>
          </section>

          {/* BRAND CONCEPT */}
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Concept</h2>
            <ul style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7', paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Numbered, limited editions — each run sold once and never reissued.</li>
              <li>Every model named after an extinct or critically endangered species.</li>
              <li>Hand-stamped authentication marking each pair's place in its edition.</li>
              <li>A percentage of profit from every release directed to conservation efforts.</li>
            </ul>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              This positions Vanara less as a conventional sneaker brand and more as a collectible — closer to a limited print or a memorial object than a mass-market shoe. The scarcity is real and permanent: once a run sells out, it is retired for good.
            </p>
          </section>

          {/* MISSION */}
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mission</h2>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              Vanara exists to turn everyday objects into quiet acts of remembrance — and to put real resources behind conservation. Ten percent of profit from each release supports conservation efforts tied to the species that inspired it, connecting every purchase to work being done to prevent future extinctions.
            </p>
          </section>

          {/* PRODUCT & OPERATIONS */}
          <section>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product & Operations</h2>
            <ul style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Secure, PCI-compliant checkout with encrypted payments.</li>
              <li>Worldwide shipping, tracked and insured.</li>
              <li>Authenticated numbering — 1 of 200 per edition.</li>
              <li>Waitlist access for upcoming Field Record releases.</li>
            </ul>
          </section>

          {/* VISION FORWARD */}
          <section style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '40px' }}>
            <h2 className="serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vision Forward</h2>
            <p style={{ color: 'var(--bone-dim)', fontSize: '15.5px', lineHeight: '1.7' }}>
              As Vanara grows, each new Field Record will document a different species and a different chapter of loss — building, over time, a physical archive worn on people's feet rather than kept behind glass. The long-term goal is a recognizable, story-led collectible brand with a genuine conservation footprint, not just a marketing angle.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
