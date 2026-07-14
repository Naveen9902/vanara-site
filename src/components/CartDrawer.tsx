"use client";

import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isCartOpen, closeCart } = useCart();
  const { data: session } = useSession();
  
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const advancePerItem = 10;
  const advanceTotal = cart.length * advancePerItem;
  const balanceTotal = total - advanceTotal;

  const handleSubmit = async () => {
    if (!session) {
      setIsLoginOpen(true);
      return;
    }

    if (cart.length === 0) return;
    
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart })
      });
      
      const data = await res.json();

      if (res.ok && data.url) {
        // Redirect to Razorpay Checkout
        window.location.href = data.url;
      } else {
        setMsg(data.error || "Failed to initialize secure checkout.");
        setLoading(false);
      }
    } catch (err) {
      setMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`va-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart}></div>
      <div className={`va-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="va-drawer-head">
          <h3 className="serif">Reserved</h3>
          <button className="va-close" onClick={closeCart}>&times;</button>
        </div>
        <div className="va-drawer-body">
          {cart.length === 0 ? (
            <div className="va-empty-cart">No pieces reserved yet.</div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="va-cart-item">
                <div className="r1">
                  <span>Baiji Edition</span>
                  <span>${item.price}</span>
                </div>
                <div className="r2">
                  Size {item.size} · No. {String(item.num).padStart(3, '0')} / 200
                </div>
                <button className="va-remove" onClick={() => removeFromCart(idx)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="va-drawer-foot">
            {session && (
              <div style={{ marginBottom: '24px', paddingTop: '16px', borderTop: '1px solid var(--line-soft)' }}>
                <h4 className="serif" style={{ fontSize: '15px', marginBottom: '8px', color: 'var(--bone)' }}>Secure Reservation</h4>
                <p style={{ fontSize: '12px', color: 'var(--bone-dim)', lineHeight: '1.5' }}>
                  You are making an advance payment to secure your piece. The balance will be requested prior to shipping. Payments are encrypted and processed securely by <strong>Razorpay</strong>.
                </p>
              </div>
            )}
            
            <div className="total" style={{ borderBottom: '1px dashed var(--line-soft)', paddingBottom: '12px', marginBottom: '12px', color: 'var(--bone-dim)' }}>
              <span>Total Value</span>
              <span>${total}</span>
            </div>
            
            <div className="total" style={{ fontWeight: 'bold', color: 'var(--bone)' }}>
              <span>Advance Due Today</span>
              <span>${advanceTotal}</span>
            </div>
            
            <div className="total" style={{ fontSize: '11px', color: 'var(--bone-dim)', marginBottom: '16px' }}>
              <span>Balance due prior to shipping</span>
              <span>${balanceTotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px', opacity: 0.6 }}>
              {/* Fake Razorpay/SSL Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: "'IBM Plex Mono', monospace" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                SSL ENCRYPTED
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: "'IBM Plex Mono', monospace" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                RAZORPAY SECURE
              </div>
            </div>
            
            <button className="va-btn primary" style={{ width: '100%' }} onClick={handleSubmit} disabled={loading}>
              {!session ? 'Log in to Checkout' : loading ? 'Processing Payment...' : `Pay $${advanceTotal} Advance`}
            </button>
            
            {msg && (
              <div className="va-form-msg" style={{ color: msg.includes("Please") || msg.includes("error") || msg.includes("wrong") || msg.includes("already") || msg.includes("exceeded") ? 'var(--brick)' : 'var(--river)' }}>
                {msg}
              </div>
            )}
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
