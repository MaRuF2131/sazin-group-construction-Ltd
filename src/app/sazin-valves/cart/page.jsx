'use client';

import { useCart } from '../../components/CartProvider';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-700 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white">Inquiry List</h1>
          <p className="text-brand-200/80 mt-1 text-sm">
            {totalItems > 0
              ? `${totalItems} item(s) in your inquiry`
              : 'Your inquiry list is empty'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white border border-gray-200">
            <div className="text-6xl mb-5 opacity-30">📋</div>
            <h3 className="font-heading text-xl font-semibold text-brand-700 mb-2">
              No items in your inquiry
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Browse our products and add items to your inquiry list
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 transition-colors text-sm"
            >
              Browse Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items list */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-5 p-5 ${i > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  {/* Image */}
                  <div
                    className="w-20 h-20 flex items-center justify-center shrink-0 text-4xl"
                    style={{ backgroundColor: item.color || '#1a3f6b' }}
                  >
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/sazin-valves/products/${item.slug}`}
                      className="font-heading font-semibold text-brand-700 hover:text-accent-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">Contact for price</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-2 text-gray-500 hover:text-brand-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-brand-700 border-x border-gray-200 min-w-[44px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-brand-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
                    title="Remove"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Total Items</span>
                <span className="text-sm font-semibold text-brand-700">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-500">Estimated Value</span>
                <span className="text-sm font-semibold text-brand-700">
                  {totalPrice > 0 ? `৳${totalPrice.toLocaleString()}` : 'Contact for Quote'}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                This is an inquiry list. Prices are available on request. Submit to receive a detailed quotation from our sales team.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:info@sazin.com.bd?subject=Product Inquiry - ${totalItems} item(s)&body=${items.map((i) => `${i.name} (Qty: ${i.qty})`).join('%0A')}`}
                  className="flex-1 bg-accent-500 hover:bg-accent-600 text-white text-center font-semibold py-3.5 transition-colors text-sm"
                >
                  Send Inquiry via Email
                </a>
                <button
                  onClick={clearCart}
                  className="flex-1 border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-300 text-center font-medium py-3.5 transition-colors text-sm"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-600 font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}