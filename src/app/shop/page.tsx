"use client";

import { useRouter } from "next/navigation";

export default function Shop() {
  const router = useRouter();

  return (
    <div className="va-view active">
      <section className="va-section" style={{ paddingTop: '8vh' }}>
        <div className="va-section-label">Field Records</div>
        <h2 className="serif" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>One species at a time.</h2>
        <div className="va-shop-grid">
          <div className="va-pcard" onClick={() => router.push('/product')}>
            <div className="va-pcard-art" style={{ padding: 0, overflow: 'hidden' }}>
              <img src="/images/baiji.jpg" alt="The Baiji Edition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="va-pcard-body">
              <div className="tag">FIELD RECORD NO. 01</div>
              <h3>The Baiji Edition</h3>
              <p>200 pairs · Bone / River-blue · $228</p>
            </div>
          </div>
          <div className="va-pcard locked">
            <div className="va-pcard-art">
              <svg viewBox="0 0 400 220">
                <path d="M60,150 Q200,60 340,150" fill="none" stroke="#25393E" strokeWidth="1.4" strokeDasharray="4 6"/>
              </svg>
            </div>
            <div className="va-pcard-body">
              <div className="tag">FIELD RECORD NO. 02</div>
              <h3>Unannounced</h3>
              <p>Coming next quarter</p>
            </div>
          </div>
          <div className="va-pcard locked">
            <div className="va-pcard-art">
              <svg viewBox="0 0 400 220">
                <path d="M60,150 Q200,60 340,150" fill="none" stroke="#25393E" strokeWidth="1.4" strokeDasharray="4 6"/>
              </svg>
            </div>
            <div className="va-pcard-body">
              <div className="tag">FIELD RECORD NO. 03</div>
              <h3>Unannounced</h3>
              <p>Coming next quarter</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
