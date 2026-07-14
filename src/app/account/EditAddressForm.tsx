"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditAddressFormProps {
  initialAddress: string;
}

export default function EditAddressForm({ initialAddress }: EditAddressFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(initialAddress || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    if (!initialAddress) {
      return (
        <div className="status-box inactive" style={{ marginTop: '12px' }}>
          <div>
            <strong>No Address Saved</strong>
            <p>You can add your address now for faster checkout.</p>
          </div>
          <button className="va-btn secondary small" onClick={() => setIsEditing(true)}>Add</button>
        </div>
      );
    }
    
    return (
      <div className="status-box active" style={{ marginTop: '12px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <strong>Saved Address</strong>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5, marginTop: '8px' }}>{initialAddress}</p>
        </div>
        <button className="va-btn secondary small" onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <div className="res-items edit-form-container" style={{ marginTop: '12px' }}>
      <div className="va-field" style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: 'var(--bone-dim)', display: 'block', marginBottom: '6px' }}>Full Address</label>
        <textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Street address, City, ZIP code, Country..."
          style={{ width: '100%', color: 'var(--bone)', padding: '10px 12px', fontSize: '14px', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
          disabled={loading}
          autoFocus
        />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="va-btn primary small" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Address'}
        </button>
        <button className="va-btn secondary small" onClick={() => setIsEditing(false)} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
}
