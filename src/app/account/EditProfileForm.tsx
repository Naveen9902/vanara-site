"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  initialName: string;
  email: string;
}

export default function EditProfileForm({ initialName, email }: EditProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
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
    return (
      <div className="res-items" style={{ marginBottom: '24px' }}>
        <div className="res-item" style={{ alignItems: 'center' }}>
          <span style={{ color: 'var(--bone-dim)', fontSize: '13px' }}>Email</span>
          <span style={{ fontSize: '14px' }}>{email}</span>
        </div>
        <div className="res-item" style={{ alignItems: 'center' }}>
          <span style={{ color: 'var(--bone-dim)', fontSize: '13px' }}>Name</span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px' }}>{initialName || "—"}</span>
            <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: 'var(--river)', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}>Edit</button>
          </div>
        </div>
        <div className="res-item" style={{ alignItems: 'center' }}>
          <span style={{ color: 'var(--bone-dim)', fontSize: '13px' }}>Authentication</span>
          <span style={{ fontSize: '14px' }}>Email OTP</span>
        </div>
      </div>
    );
  }

  return (
    <div className="res-items edit-form-container" style={{ marginBottom: '24px' }}>
      <div className="va-field" style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: 'var(--bone-dim)', display: 'block', marginBottom: '6px' }}>Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name"
          style={{ width: '100%', color: 'var(--bone)', padding: '10px 12px', fontSize: '14px', outline: 'none' }}
          disabled={loading}
          autoFocus
        />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="va-btn primary small" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button className="va-btn secondary small" onClick={() => setIsEditing(false)} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
}
