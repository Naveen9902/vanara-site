"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navigation() {
  const { cart, openCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="va-nav">
      <button className="va-wordmark" onClick={() => router.push('/')}>Vanara</button>
      <div className="va-navlinks">
        <button className={pathname === '/shop' ? 'active' : ''} onClick={() => router.push('/shop')}>Shop</button>
        <button className={pathname === '/record' ? 'active' : ''} onClick={() => router.push('/record')}>Record</button>
        <button className={pathname === '/journal' ? 'active' : ''} onClick={() => router.push('/journal')}>Journal</button>
        <button className={pathname === '/about' ? 'active' : ''} onClick={() => router.push('/about')}>About</button>
      </div>
      <div className="va-nav-right">
        {session ? (
          <button className="va-cart-btn" onClick={() => router.push('/account')}>Account</button>
        ) : (
          <button className="va-cart-btn" onClick={() => setIsLoginOpen(true)}>Log in</button>
        )}
        <button className="va-cart-btn" onClick={openCart}>
          Cart <span className="va-cart-count">[{cart.length}]</span>
        </button>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}
