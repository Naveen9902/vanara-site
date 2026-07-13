"use client";

import React, { useState } from 'react';

const allFaqs = [
  ['What is Vanara?', 'Vanara creates strictly numbered, extremely limited apparel runs dedicated to functionally extinct species. We serve as a permanent, physical record for species the world let vanish.'],
  ['How does the numbering work?', 'Each piece is hand-stamped with a unique number from 1 to 100 on the inner tag. Once a number is reserved at checkout, it is yours. It cannot be reissued to anyone else.'],
  ['Will previous editions ever be restocked?', 'No. Every Vanara edition is a single, strictly limited run. Once all 100 pieces are sold, the edition is retired permanently. We never reissue past designs.'],
  ['Where do you ship?', 'We ship worldwide directly from our headquarters in Bangalore, India. Standard international delivery typically takes 5–10 business days.'],
  ['What is your returns policy?', 'Unworn and unwashed pieces in their original pristine condition (including the certificate of numbering) can be returned within 14 days of delivery for a refund.'],
  ['Where does the conservation share go?', '10% of profit from every edition goes directly to active conservation work. For example, our Baiji edition proceeds are directed to freshwater species conservation. Partner details are always confirmed in your order email.']
];

export default function FAQ() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="va-view active" style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 6vw' }}>
        
        <div className="va-section-label" style={{ marginBottom: '16px' }}>Support</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '48px' }}>Frequently Asked Questions</h1>
        
        <div style={{ marginTop: '20px' }}>
          {allFaqs.map((item, i) => (
            <div key={i} className={`va-faq-item ${faqOpen === i ? 'open' : ''}`} style={{ marginBottom: '16px' }}>
              <button 
                className="va-faq-q" 
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                style={{ fontSize: '18px', padding: '20px 0' }}
              >
                {item[0]}<span className="plus" style={{ fontSize: '24px' }}>{faqOpen === i ? '−' : '+'}</span>
              </button>
              <div className="va-faq-a" style={{ paddingBottom: faqOpen === i ? '20px' : '0' }}>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--bone-dim)' }}>{item[1]}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '64px', borderTop: '1px solid var(--line-soft)', paddingTop: '32px', textAlign: 'center' }}>
          <p style={{ color: 'var(--bone-dim)', marginBottom: '16px' }}>Still have questions?</p>
          <a href="mailto:vanaraextinct@gmail.com" className="va-btn secondary small" style={{ textDecoration: 'none', display: 'inline-block' }}>Contact Us</a>
        </div>

      </div>
    </div>
  );
}
