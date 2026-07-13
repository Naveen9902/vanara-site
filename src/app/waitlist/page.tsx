"use client";

import { useState } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
          setMsg("Mail request accepted! You're on the record.");
          setEmail('');
        } else {
          setMsg("Something went wrong. Please try again.");
        }
      } catch (err) {
        setMsg("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="va-view active">
      <section className="va-section" style={{ paddingTop: '8vh' }}>
        <div className="va-waitlist">
          <div className="va-section-label" style={{ textAlign: 'center' }}>Join the Record</div>
          <h2 className="serif">Get early access, before the public drop.</h2>
          <p>The waitlist opens numbering first. Public release follows, while supply lasts.</p>
          <form className="va-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            <button type="submit" disabled={loading}>{loading ? 'Joining...' : 'Notify me first'}</button>
          </form>
          <div className="va-form-msg">{msg}</div>
        </div>
      </section>
    </div>
  );
}
