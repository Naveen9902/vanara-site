"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="va-view active">
      <section className="va-hero">
        <svg className="va-topo" viewBox="0 0 1400 700" preserveAspectRatio="none">
          <path d="M-50,120 C 200,80 400,180 650,140 S 1100,60 1450,110" />
          <path d="M-50,220 C 220,190 420,260 680,230 S 1120,170 1450,210" />
          <path className="hi" d="M-50,320 C 240,300 460,360 700,330 S 1140,280 1450,320" />
          <path d="M-50,410 C 260,400 480,450 720,420 S 1160,380 1450,410" />
          <path d="M-50,500 C 280,500 500,540 740,510 S 1180,480 1450,500" />
          <path className="hi" d="M-50,590 C 300,600 520,630 760,600 S 1200,580 1450,590" />
        </svg>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="va-eyebrow"
        >
          Limited run — 200 pairs, never repeated
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="va-headline serif"
        >
          Some things<br/>only exist <em>once.</em>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="va-sub"
        >
          Every Vanara release is named for a species the world let vanish. Each run is numbered, sold once, and never remade.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.5 }}
          className="va-cta-row"
        >
          <button className="va-btn primary" onClick={() => router.push('/shop')}>Shop the record</button>
          <button className="va-btn" onClick={() => router.push('/record')}>Read the story</button>
        </motion.div>
      </section>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="va-trust"
      >
        <div><b>Secure checkout</b>Encrypted, PCI-compliant payments</div>
        <div><b>Authenticated numbering</b>Hand-stamped, 1 of 200</div>
        <div><b>Worldwide shipping</b>Tracked, insured delivery</div>
        <div><b>Giving back</b>10% of profit to conservation</div>
      </motion.div>

      <section className="va-section">
        <div className="va-section-label">Field Reports</div>
        <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>What early collectors are saying.</h2>
        
        <div className="va-testi-grid">
          <div className="va-testi">
            <div className="va-stars">★★★★★</div>
            <p>"The materials are unlike anything I've seen from a mainstream brand. The fact that only 199 other people in the world have these makes them the crown jewel of my collection."</p>
            <div className="who">MARCUS T. — VERIFIED BUYER</div>
          </div>
          <div className="va-testi">
            <div className="va-stars">★★★★★</div>
            <p>"I was skeptical of the price until I opened the box. The hand-stamped numbering and the topographic details are immaculate. A true piece of art."</p>
            <div className="who">ELENA R. — SNEAKERHEADS QUARTERLY</div>
          </div>
          <div className="va-testi">
            <div className="va-stars">★★★★★</div>
            <p>"Finally a brand that actually cares about the story and the impact. The shoes are incredibly comfortable, but wearing them feels like wearing history."</p>
            <div className="who">DAVID K. — VERIFIED BUYER</div>
          </div>
        </div>
      </section>
    </div>
  );
}
