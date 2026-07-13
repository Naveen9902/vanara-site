import React from 'react';

export default function ShippingAndReturns() {
  return (
    <div className="va-view active" style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 6vw' }}>
        
        <div className="va-section-label" style={{ marginBottom: '16px' }}>Support</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '48px' }}>Shipping &amp; Returns</h1>
        
        <div className="va-story">
          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--bone)' }}>Shipping Policies</h3>
          <p style={{ fontSize: '16px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
            We ship worldwide from our headquarters in Bangalore, India. Because our pieces are strictly numbered and extremely limited, every order is processed with the utmost care.
          </p>
          <ul style={{ color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Orders are typically processed and dispatched within 2–3 business days.</li>
            <li style={{ marginBottom: '8px' }}>Standard international shipping usually takes 5–10 business days depending on your location.</li>
            <li style={{ marginBottom: '8px' }}>Once your order is dispatched, you will receive a confirmation email containing your tracking number.</li>
            <li>Please note that international customers are responsible for any customs duties or taxes levied by their respective countries.</li>
          </ul>

          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--bone)' }}>Returns &amp; Refunds</h3>
          <p style={{ fontSize: '16px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
            We accept returns within 14 days of the delivery date. To be eligible for a return, the item must be unworn, unwashed, and in its original pristine condition, including the certificate of numbering.
          </p>
          <ul style={{ color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Customers are responsible for the cost of return shipping.</li>
            <li style={{ marginBottom: '8px' }}>Once we receive and inspect the returned item, a refund will be issued to your original payment method within 7 business days.</li>
            <li style={{ marginBottom: '8px' }}>Original shipping fees are non-refundable.</li>
          </ul>

          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--bone)' }}>Exchanges</h3>
          <p style={{ fontSize: '16px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
            Because our runs are strictly capped at extremely limited numbers (e.g., 100 pairs total), we generally cannot guarantee size exchanges. If you need a different size, please reach out to us immediately at <a href="mailto:vanaraextinct@gmail.com" style={{ color: 'var(--river)', textDecoration: 'none' }}>vanaraextinct@gmail.com</a>, and we will do our best to accommodate you if stock permits.
          </p>

        </div>
      </div>
    </div>
  );
}
