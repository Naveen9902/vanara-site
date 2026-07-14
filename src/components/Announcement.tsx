"use client";

import { useState, useEffect } from 'react';

export default function Announcement() {
  const [remain, setRemain] = useState(16); // Default fallback

  useEffect(() => {
    fetch('/api/reservations/booked')
      .then(res => res.json())
      .then(data => {
        if (data.booked) {
          setRemain(200 - data.booked.length);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="va-announce">
      EDITION NO. 01 — THE BAIJI EDITION — {remain} OF 200 REMAIN — WORLDWIDE SHIPPING
    </div>
  );
}
