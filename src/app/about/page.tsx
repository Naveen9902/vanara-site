import React from 'react';

export default function About() {
  return (
    <div className="va-view active" style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 6vw' }}>
        
        <div className="va-section-label" style={{ marginBottom: '16px' }}>About Vanara</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '32px' }}>Wear Memories.<br/>Protect Tomorrow.</h1>
        
        <div className="va-story" style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '18px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '24px' }}>
            Every piece we create tells a story that should never be forgotten. We honor what's been lost by protecting what's left.
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Vanara was founded on a simple principle: some species vanish quietly, reduced to footnotes in scientific journals. We believe their memory deserves a permanent, physical record.
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            We design strictly numbered, extremely limited apparel runs dedicated to functionally extinct species. Each run is produced exactly once and never reissued. A portion of all proceeds is donated directly to conservation efforts protecting the natural habitats that still remain.
          </p>
          <p style={{ lineHeight: 1.6 }}>
            Thank you for being part of the change.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '64px' }}>
          <div className="va-section-label" style={{ marginBottom: '24px' }}>Contact Information</div>
          <div className="va-card" style={{ padding: '32px' }}>
            <div className="va-row" style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px dashed var(--line-soft)' }}>
              <span style={{ color: 'var(--bone-dim)' }}>Email</span>
              <span><a href="mailto:vanaraextinct@gmail.com" style={{ color: 'var(--river)', textDecoration: 'none' }}>vanaraextinct@gmail.com</a></span>
            </div>
            <div className="va-row" style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px dashed var(--line-soft)' }}>
              <span style={{ color: 'var(--bone-dim)' }}>Phone</span>
              <span>9380465969</span>
            </div>
            <div className="va-row">
              <span style={{ color: 'var(--bone-dim)' }}>Address</span>
              <span>Bangalore, India</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
