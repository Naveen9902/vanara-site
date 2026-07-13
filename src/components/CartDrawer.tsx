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

  // Payment State
  const [upiId, setUpiId] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const advancePerItem = 10;
  const advanceTotal = cart.length * advancePerItem;
  const balanceTotal = total - advanceTotal;

  const handleSubmit = async () => {
    if (!session) {
      setIsLoginOpen(true);
      return;
    }

    if (cart.length > 0) {
      if (!upiId) {
        setMsg("Please enter the Transaction ID to verify your payment.");
        return;
      }
    }
    
    setLoading(true);
    setMsg("");

    // Simulate Payment Processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, paymentMethod: 'upi', transactionId: upiId })
      });
      
      const data = await res.json();

      if (res.ok) {
        setMsg(`Payment successful! Reservation secured for ${session.user?.email}.`);
        setTimeout(() => {
          clearCart();
          setMsg("");
          setUpiId("");
          closeCart();
        }, 3000);
      } else {
        setMsg(data.error || "Something went wrong with your reservation.");
      }
    } catch (err) {
      setMsg("Network error. Please try again.");
    } finally {
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
            <div className="va-empty-cart">No pairs reserved yet.</div>
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
                <h4 className="serif" style={{ fontSize: '15px', marginBottom: '12px', color: 'var(--bone)' }}>Secure Reservation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', background: 'var(--bg-panel-2)', padding: '16px', border: '1px solid var(--line)' }}>
                  <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--bone)' }}>
                    Scan to pay <strong>$10 (~₹850) Advance</strong>
                  </div>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9380465969@ptyes%26pn=Vanara%26am=850%26cu=INR`} 
                    alt="UPI QR Code" 
                    style={{ borderRadius: '8px', border: '4px solid #fff' }}
                  />
                  <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--bone-dim)' }}>
                    Or pay manually to VPA:<br/>
                    <strong style={{ color: 'var(--river)', fontSize: '13px' }}>9380465969@ptyes</strong>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter 12-digit UTR / Transaction ID" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    disabled={loading}
                    style={{ width: '100%', background: 'var(--bg-deep)', border: '1px solid var(--line)', padding: '10px 12px', color: 'var(--bone)', fontSize: '13px', outline: 'none', textAlign: 'center' }}
                  />
                </div>
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
            
            <div className="total" style={{ fontSize: '11px', color: 'var(--bone-dim)', marginBottom: '20px' }}>
              <span>Balance due prior to shipping</span>
              <span>${balanceTotal}</span>
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
