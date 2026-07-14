"use client";

import { useState } from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !loading) {
      setLoading(true);
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) {
          toast.success("You're on the record.");
          setEmail('');
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <footer className="va-footer">
      <div className="va-footer-grid">
        <div className="va-footer-col">
          <h5>Vanara</h5>
          <p>A numbered record of species the world let vanish. Each edition sold once, never remade.</p>
          <form className="va-foot-form" onSubmit={handleJoin}>
            <input type="email" placeholder="Email for updates" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
            <button type="submit" disabled={loading}>{loading ? '...' : 'Join'}</button>
          </form>
        </div>
        <div className="va-footer-col">
          <h5>Shop</h5>
          <a onClick={() => router.push('/shop')}>All editions</a>
          <a onClick={() => router.push('/product')}>The Baiji Edition</a>
          <a onClick={() => router.push('/record')}>The Record</a>
        </div>
        <div className="va-footer-col">
          <h5>Support</h5>
          <a onClick={() => router.push('/shipping')}>Shipping &amp; returns</a>
          <a onClick={() => router.push('/size-guide')}>Size guide</a>
          <a onClick={() => router.push('/about')}>Contact</a>
          <a onClick={() => router.push('/faq')}>FAQ</a>
        </div>
        <div className="va-footer-col">
          <h5>Company</h5>
          <a onClick={() => router.push('/about')}>About Vanara</a>
        </div>
      </div>
      <div className="va-seal-row">
        <div className="va-seal-panel">
          <svg width="200" height="82" viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
            <path d="M18,20 L34,54 L50,20" fill="none" stroke="#0A1417" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M20,58 C24,50 30,50 34,54 C38,50 44,50 48,58" fill="none" stroke="#4E6B72" strokeWidth="1.1"/>
            <text x="66" y="50" fontFamily="Newsreader, serif" fontWeight="500" fontSize="30" letterSpacing="4" fill="#0A1417">VANARA</text>
          </svg>
          <div className="va-seal-caption">Every pair carries this mark, numbered and never reissued.</div>
        </div>
      </div>

      <div className="va-footer-bottom">
        <div>© 2026 VANARA — IN MEMORY OF WHAT CANNOT BE REMADE</div>
        <div className="va-payment-icons"><span>VISA</span><span>MC</span><span>AMEX</span><span>PAYPAL</span></div>
      </div>
    </footer>
  );
}
