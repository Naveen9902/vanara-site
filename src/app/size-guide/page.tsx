import React from 'react';
import Link from 'next/link';

export default function SizeGuide() {
  return (
    <div className="va-view active" style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 6vw' }}>
        
        <div className="va-section-label" style={{ marginBottom: '16px' }}>Support</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '48px' }}>Size Guide</h1>
        
        <div className="va-story">
          <p style={{ fontSize: '16px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '32px' }}>
            Our heavyweight French Terry sweatshirts are designed for a relaxed, extremely comfortable fit. 
            Because our runs are strictly limited and never reissued, we highly recommend measuring a sweatshirt 
            you already own to ensure the perfect fit before reserving your edition number.
          </p>

          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--bone)' }}>Sweatshirt Measurements (Inches)</h3>
          
          <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--river)' }}>
                  <th style={{ padding: '16px 8px', color: 'var(--river)' }}>Size</th>
                  <th style={{ padding: '16px 8px', color: 'var(--river)' }}>Chest</th>
                  <th style={{ padding: '16px 8px', color: 'var(--river)' }}>Length</th>
                  <th style={{ padding: '16px 8px', color: 'var(--river)' }}>Sleeve</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--bone-dim)' }}>
                <tr style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <td style={{ padding: '16px 8px', color: 'var(--bone)' }}>S</td>
                  <td style={{ padding: '16px 8px' }}>38 - 40"</td>
                  <td style={{ padding: '16px 8px' }}>27"</td>
                  <td style={{ padding: '16px 8px' }}>24"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <td style={{ padding: '16px 8px', color: 'var(--bone)' }}>M</td>
                  <td style={{ padding: '16px 8px' }}>40 - 42"</td>
                  <td style={{ padding: '16px 8px' }}>28"</td>
                  <td style={{ padding: '16px 8px' }}>25"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <td style={{ padding: '16px 8px', color: 'var(--bone)' }}>L</td>
                  <td style={{ padding: '16px 8px' }}>42 - 44"</td>
                  <td style={{ padding: '16px 8px' }}>29"</td>
                  <td style={{ padding: '16px 8px' }}>26"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <td style={{ padding: '16px 8px', color: 'var(--bone)' }}>XL</td>
                  <td style={{ padding: '16px 8px' }}>44 - 46"</td>
                  <td style={{ padding: '16px 8px' }}>30"</td>
                  <td style={{ padding: '16px 8px' }}>26.5"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <td style={{ padding: '16px 8px', color: 'var(--bone)' }}>XXL</td>
                  <td style={{ padding: '16px 8px' }}>46 - 48"</td>
                  <td style={{ padding: '16px 8px' }}>31"</td>
                  <td style={{ padding: '16px 8px' }}>27"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--bone)' }}>How to Measure</h3>
          <ul style={{ color: 'var(--bone-dim)', lineHeight: 1.6, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><b>Chest:</b> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
            <li style={{ marginBottom: '8px' }}><b>Length:</b> Measure from the highest point of the shoulder down to the hem.</li>
            <li><b>Sleeve:</b> Measure from the shoulder seam down to the cuff.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
