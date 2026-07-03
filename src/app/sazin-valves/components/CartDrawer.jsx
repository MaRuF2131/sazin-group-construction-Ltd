'use client';

import { useCart } from './CartProvider';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeFromCart, updateQty, clearCart, totalItems } = useCart();

  return (
    <div className="relative">
      <input type="checkbox" id="cart-toggle" className="hidden" />

      {/* Cart Icon Button */}
      <label
        htmlFor="cart-toggle"
        className="relative cursor-pointer text-brand-200 hover:text-white transition-colors p-1"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center min-w-[18px] min-h-[18px]">
            {totalItems}
          </span>
        )}
      </label>

      {/* Overlay */}
      <label
        htmlFor="cart-toggle"
        className="cart-overlay fixed inset-0 bg-black/50 z-[60] opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="cart-panel fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-heading text-lg font-semibold text-brand-700">
            Inquiry List ({totalItems})
          </h3>
          <label
            htmlFor="cart-toggle"
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3 opacity-40">📋</div>
              <p className="text-gray-400 text-sm">Your inquiry list is empty</p>
              <label
                htmlFor="cart-toggle"
                className="inline-block mt-4 text-accent-500 hover:text-accent-600 text-sm font-medium cursor-pointer"
              >
                Continue Shopping
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-100">
                  <div
                    className="w-14 h-14 flex items-center justify-center shrink-0 text-2xl"
                    style={{ backgroundColor: item.color || '#1a3f6b' }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-brand-700 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Contact for price</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-brand-700 text-xs transition-colors"
                        >
                          −
                        </button>
                        <span className="px-2.5 py-1 text-xs font-medium text-brand-700 border-x border-gray-200 min-w-[28px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-brand-700 text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 text-xs transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-3">
            <p className="text-xs text-gray-400 text-center">
              Prices are available on request. Submit your inquiry to get a quote.
            </p>
            <Link
              href="/cart"
              onClick={() => {
                document.getElementById('cart-toggle').checked = false;
              }}
              className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center font-semibold py-3 transition-colors text-sm"
            >
              View Full Inquiry
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-center text-gray-400 hover:text-red-500 text-xs transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}