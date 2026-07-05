import React from 'react';
import Link from 'next/link';

const ProductCard = React.memo(function ProductCard({ product }) {
  return (
    <Link
      href={`/sazin-valves/products/${product._id}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
    >
      {/* Image area - টেকনিক্যাল ব্যাকগ্রাউন্ড সহ */}
      <div
        className="h-56 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: product.color || '#1a3f6b' }}
      >
        {/* ইন্ডাস্ট্রিয়াল গ্রিড প্যাটার্ন (হিরো সেকশনের মতো) */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* ইমোজিতে হালকা শ্যাডো এবং হোভারে জুম ইফেক্ট */}
        <span className="text-2xl p-4 product-img drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out">
          <img className='w-full h-full object-cover' src={product?.imageUrl} alt={product.name} />
        </span>

        {/* ফ্রস্টেড গ্লাস "View Details" বাটন */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
          View Details
        </div>

        {/* Featured badge - আরও স্মুথ দেখতে */}
        {product.featured && (
          <span className="absolute z-50 top-4 left-4 bg-gradient-to-r from-accent-500 to-accent-600 text-red-700 text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shadow-lg shadow-accent-500/30">
            Featured
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6">
        {/* টাইটেল আরও বোল্ড এবং ক্লিয়ার */}
        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-black group-hover:text-brand-700 transition-colors duration-300 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">
          {product.shortDesc}
        </p>

        {/* Quick spec tags - মডার্ন চিপস ডিজাইন */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.specs
            .filter((s) => ['Size Range', 'Pressure Rating', 'Connection'].includes(s.label))
            .slice(0, 3)
            .map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md"
              >
                {s.value}
              </span>
            ))}
        </div>

        {/* Bottom row - আরও প্রিমিয়াম ফিল */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* প্রাইস বা রিকোয়েস্ট বাটন */}
          <span className="text-sm">
            {product.price > 0 ? (
              <span className="font-bold text-gray-800">৳{product.price.toLocaleString()}</span>
            ) : (
              <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                Request Price
              </span>
            )}
          </span>
          
          {/* ডিটেইলস অ্যারোতে গ্যাপ বাড়ানোর অ্যানিমেশন */}
          <span className="flex items-center gap-1.5 text-brand-600 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
            Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;