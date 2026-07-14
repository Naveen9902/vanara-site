"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/baiji.jpg",
  "/images/spec.jpg",
  "/images/animal.jpg",
  "/images/message.jpg"
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const faqData = [
  ['How does the numbering work?', 'Each piece is hand-stamped with a unique number from 1 to 200 on the inner tag. Once a number is reserved, it cannot be reissued to anyone else.'],
  ['Will this colorway ever be restocked?', 'No. The Baiji Edition is a single 200-piece run. Once sold, it is retired permanently, consistent with every Vanara release.'],
  ['Where does the conservation share go?', '10% of profit from this edition goes to freshwater species conservation work. Partner details are confirmed on the order confirmation email.'],
  ['What is your returns policy?', 'Unworn pieces can be returned within 14 days of delivery for a refund, excluding return shipping.']
];

export default function Product() {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedNum, setSelectedNum] = useState<string>('');
  const [bookedNums, setBookedNums] = useState<string[]>([]);
  const [loadingBooked, setLoadingBooked] = useState(true);

  const [activeView, setActiveView] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    fetch('/api/reservations/booked')
      .then(res => res.json())
      .then(data => {
        const booked = data.booked || [];
        setBookedNums(booked);
        // Find first available number
        for (let i = 1; i <= 200; i++) {
          if (!booked.includes(String(i))) {
            setSelectedNum(String(i));
            break;
          }
        }
        setLoadingBooked(false);
      })
      .catch(() => setLoadingBooked(false));
  }, []);

  const price = 199;

  const handleReserve = () => {
    if (!selectedSize) {
      toast.error('Please select a size before reserving.');
      return;
    }
    
    addToCart({ size: selectedSize, num: selectedNum, price });
    
    toast.success('Added to your reservation bag.');
    openCart();
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveView((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveView((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="va-view active">
      <section className="va-section" style={{ paddingTop: '8vh' }}>
        <button className="va-back" onClick={() => router.push('/shop')}>&larr; Back to Shop</button>
        <div className="va-product">
          <div>
            <div 
              className="va-gallery-main" 
              style={{ padding: 0, overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
              onClick={() => setIsLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeView}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeView]} 
                  alt={`Product View ${activeView + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: activeView === 0 ? 'contain' : 'cover', 
                    backgroundColor: activeView === 0 ? '#cedbea' : 'transparent' 
                  }} 
                />
              </AnimatePresence>
              
              <button 
                onClick={handlePrevImage}
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10 }}
              >
                &#8249;
              </button>
              
              <button 
                onClick={handleNextImage}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', zIndex: 10 }}
              >
                &#8250;
              </button>

              {activeView === 0 && (
                <div className="num" style={{ position: 'absolute', bottom: '16px', right: '16px', color: '#111', background: 'rgba(255,255,255,0.7)', padding: '4px 8px', borderRadius: '4px', zIndex: 5 }}>
                  Selected: No. <span>{selectedNum ? selectedNum.padStart(3, '0') : '...'}</span> / 200
                </div>
              )}
            </div>
            <div className="va-thumbs">
              {images.map((imgSrc, idx) => (
                <div 
                  key={idx}
                  className={`va-thumb ${activeView === idx ? 'active' : ''}`} 
                  style={{ padding: 0, overflow: 'hidden' }} 
                  onClick={() => setActiveView(idx)}
                >
                  <img src={imgSrc} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="va-section-label">Field Record No. 01</div>
            <h1 className="serif">The Baiji Edition</h1>
            <div className="va-stars">★★★★★</div>
            <div className="va-review-note">New release — be the first to review</div>
            <div className="va-price">${price} USD</div>
            <p className="desc">Bone-white upper, pale river-blue sole. A topographic line of the Yangtze is etched into the midsole, visible only up close. Individually numbered on the insole. Named for the Baiji, declared functionally extinct in 2006.</p>

            <div className="va-field">
              <div className="va-field-head">
                <label>Size (US)</label>
                <button className="va-sizeguide-link" onClick={() => setIsSizeGuideOpen(true)}>Size guide</button>
              </div>
              <div className="va-size-row">
                {sizes.map((s) => (
                  <button 
                    key={s} 
                    className={`va-size-opt ${selectedSize === s ? 'selected' : ''}`} 
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="va-field">
              <label>Edition number</label>
              <select 
                className="va-select" 
                style={{ marginTop: '10px' }} 
                value={selectedNum} 
                onChange={(e) => setSelectedNum(e.target.value)}
                disabled={loadingBooked}
              >
                {loadingBooked && <option value="">Loading availability...</option>}
                {!loadingBooked && Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                  const isBooked = bookedNums.includes(String(num));
                  return (
                    <option key={num} value={String(num)} disabled={isBooked}>
                      No. {String(num).padStart(3, '0')} / 100 {isBooked ? '(Already Ordered)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="va-btn primary" style={{ width: '100%', maxWidth: '320px' }} onClick={handleReserve} disabled={loadingBooked || !selectedNum}>
              Reserve this piece
            </button>
            <div className="va-stock-note">
              Extremely limited run — only 200 pieces worldwide.<br/>
              <span style={{ color: 'var(--bone-dim)', fontSize: '11px' }}>*$10 advance payment required to secure reservation.</span>
            </div>

            <div className="va-badge-row">
              <div className="va-badge"><span className="dot"></span>Ships worldwide, 5–10 days</div>
              <div className="va-badge"><span className="dot"></span>Free returns within 14 days</div>
              <div className="va-badge"><span className="dot"></span>Certificate of numbering included</div>
            </div>

            <div className="va-spec-list" style={{ marginTop: '30px' }}>
              <div><b>Run size</b> 200 pieces, worldwide</div>
              <div><b>Numbering</b> hand-stamped inner tag, 1–200</div>
              <div><b>Colorway</b> River-blue / Bone</div>
              <div><b>Reissue</b> never — retired at sellout</div>
              <div><b>Giving back</b> 10% of profit to freshwater conservation</div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <div className="va-section-label">Questions</div>
              <div>
                {faqData.map((item, i) => (
                  <div key={i} className={`va-faq-item ${faqOpen === i ? 'open' : ''}`}>
                    <button className="va-faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                      {item[0]}<span className="plus">+</span>
                    </button>
                    <div className="va-faq-a">
                      <p>{item[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIZE GUIDE MODAL */}
      <div className={`va-modal-overlay ${isSizeGuideOpen ? 'open' : ''}`}>
        <div className="va-modal">
          <h4 className="serif">Size guide (Sweatshirt)</h4>
          <table>
            <thead>
              <tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th><th>Sleeve (in)</th></tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>38 - 40</td><td>27</td><td>24</td></tr>
              <tr><td>M</td><td>40 - 42</td><td>28</td><td>25</td></tr>
              <tr><td>L</td><td>42 - 44</td><td>29</td><td>26</td></tr>
              <tr><td>XL</td><td>44 - 46</td><td>30</td><td>26.5</td></tr>
              <tr><td>XXL</td><td>46 - 48</td><td>31</td><td>27</td></tr>
            </tbody>
          </table>
          <button className="va-modal-close" onClick={() => setIsSizeGuideOpen(false)}>Close</button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <div 
        className={`va-modal-overlay ${isLightboxOpen ? 'open' : ''}`} 
        onClick={() => setIsLightboxOpen(false)} 
        style={{ zIndex: 1000, display: isLightboxOpen ? 'flex' : 'none', cursor: 'zoom-out', padding: '20px' }}
      >
        <button className="va-close-modal" onClick={() => setIsLightboxOpen(false)} style={{ position: 'absolute', top: '24px', right: '32px', color: '#fff', fontSize: '40px' }}>&times;</button>
        <img 
          src={images[activeView]} 
          alt="Product - Full Screen" 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', cursor: 'default' }} 
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
