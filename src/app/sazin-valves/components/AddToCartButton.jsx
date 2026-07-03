'use client';

import { useCart } from './CartProvider';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const { addToCart, items } = useCart();
  const [toast, setToast] = useState(false);

  const inCart = items.find((i) => i.id === product.id);

  function handleClick() {
    addToCart(product);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="w-full bg-accent-500 hover:bg-accent-600 active:scale-[0.98] text-white font-semibold py-3.5 px-6 transition-all duration-200 text-sm tracking-wide"
      >
        {inCart ? `In Inquiry (${inCart.qty}) — Add More` : 'Add to Inquiry List'}
      </button>

      {toast && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-800 text-white text-xs px-4 py-2 whitespace-nowrap toast-anim shadow-lg z-50">
          ✓ Added to inquiry
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-800" />
        </div>
      )}
    </div>
  );
}