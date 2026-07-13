"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep("otp");
      } else {
        setError(data.error || "Failed to send code.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // Success! Reload the page to reflect logged-in state
      window.location.reload();
    }
  };

  return (
    <div className="va-modal-overlay open" onClick={onClose}>
      <div className="va-login-modal" onClick={e => e.stopPropagation()}>
        <button className="va-close-modal" onClick={onClose}>&times;</button>
        
        {step === "email" ? (
          <>
            <h4 className="serif">Sign In</h4>
            <p className="va-login-desc">Enter your email to receive a secure 6-digit login code.</p>
            <form onSubmit={handleSendCode} className="va-login-form">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading}
                autoFocus
              />
              <button className="va-btn primary" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h4 className="serif">Enter Code</h4>
            <p className="va-login-desc">We sent a 6-digit code to <strong style={{color: 'var(--bone)'}}>{email}</strong></p>
            <form onSubmit={handleVerifyCode} className="va-login-form">
              <input 
                type="text" 
                placeholder="000000" 
                maxLength={6}
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                disabled={loading}
                className="otp-input"
                autoFocus
              />
              <button className="va-btn primary" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Log In"}
              </button>
              <button 
                type="button" 
                className="va-btn" 
                onClick={() => setStep("email")}
                style={{ marginTop: '4px', border: 'none', fontSize: '11px', color: 'var(--river)' }}
                disabled={loading}
              >
                Use a different email
              </button>
            </form>
          </>
        )}

        {error && <div className="va-login-error">{error}</div>}
      </div>
    </div>
  );
}
