import Link from 'next/link';

export default function Record() {
  return (
    <div className="va-view active record-view">

      {/* Title Section */}
      <section className="va-section" style={{ paddingTop: '60px', paddingBottom: '40px', textAlign: 'center' }}>
        <div className="va-section-label">Volume 01</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '16px' }}>The Baiji River Dolphin</h1>
        <div className="release-badge" style={{ display: 'inline-block', border: '1px solid var(--river)', color: 'var(--river)', padding: '8px 16px', borderRadius: '4px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(127,163,172,0.1)' }}>
          Inaugural Release • Announced • Reserving Now
        </div>
      </section>

      <section className="va-section" style={{ paddingTop: '40px', paddingBottom: '120px' }}>
        <div className="va-story">
          <div>
            <div className="va-section-label">The History</div>
            <h2 className="serif">A river went quiet.</h2>
            <p>For twenty million years, the Baiji moved through the Yangtze by sound alone. Near-blind in water thick with silt, it navigated and hunted by reading the river through echo. It was known in folklore as the "Goddess of the Yangtze," a symbol of peace and prosperity.</p>
            <p>But industrial traffic, rapid dam construction, and rampant pollution overwhelmed that ancient world in the span of a single human lifetime. The acoustic smog of boat engines blinded them; fishing nets drowned them; the destruction of the riverbanks starved them.</p>
            <p>A massive international expedition in 2006 searched the entire river system for six weeks and found absolutely nothing. <strong>No confirmed sighting has been verified since.</strong> The Baiji became the first dolphin species driven to extinction by human activity in recorded history.</p>
            
            <div style={{ marginTop: '48px', padding: '32px', borderLeft: '2px solid var(--river)', background: 'var(--bg-panel-2)', borderRadius: '0 4px 4px 0' }}>
              <h3 className="serif" style={{ fontSize: '22px', marginBottom: '12px' }}>The First Edition</h3>
              <p style={{ fontSize: '14px', color: 'var(--bone-dim)', marginBottom: '24px', lineHeight: 1.6 }}>
                Vanara exists to hold a permanent physical record of species like this one. Not as decoration, but as a strictly numbered edition that can never be reissued. 
                <br/><br/>
                <strong>The Baiji Edition is our first officially announced product.</strong> While it has not yet been released to the general public, our early supporters have the exclusive right to secure their numbered pair before production finishes.
              </p>
              <Link href="/product" className="va-btn primary" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Reserve Your Number</Link>
            </div>
          </div>

          <div className="va-card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src="/images/animal.jpg" alt="Baiji Dolphin" style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid var(--line)' }} />
            <div style={{ padding: '32px' }}>
              <div className="va-row"><span>Species</span><span>Lipotes vexillifer</span></div>
              <div className="va-row"><span>Common name</span><span>Baiji, Yangtze dolphin</span></div>
              <div className="va-row"><span>Status</span><span className="va-status">Functionally extinct, 2006</span></div>
              <div className="va-row"><span>Habitat</span><span>Yangtze River, China</span></div>
              <div className="va-row"><span>Est. population, 1950</span><span>~6,000</span></div>
              <div className="va-row"><span>Est. population, 2006</span><span>0</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Poster (Moved to bottom) */}
      <section style={{ width: '100%', borderTop: '1px solid var(--line)', backgroundColor: '#050a0a', display: 'flex', justifyContent: 'center' }}>
        <img src="/images/message.jpg" alt="Wear Memories. Protect Tomorrow." style={{ width: '100%', maxWidth: '1000px', height: 'auto', display: 'block' }} />
      </section>
    </div>
  );
}
