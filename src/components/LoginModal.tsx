"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="va-modal-overlay open" onClick={onClose}>
      <div className="va-login-modal" onClick={e => e.stopPropagation()}>
        <button className="va-close-modal" onClick={onClose}>&times;</button>
        
        <h4 className="serif">Sign In</h4>
        <p className="va-login-desc">Enter your email and password. If you don't have an account, one will be created automatically.</p>
        
        <form onSubmit={handleSubmit} className="va-login-form">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={loading}
            autoFocus
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={loading}
            style={{ marginTop: '10px' }}
          />
          <button className="va-btn primary" type="submit" disabled={loading} style={{ marginTop: '16px' }}>
            {loading ? "Authenticating..." : "Sign In / Register"}
          </button>
        </form>

        {error && <div className="va-login-error" style={{ marginTop: '16px' }}>{error}</div>}
      </div>
    </div>
  );
}
