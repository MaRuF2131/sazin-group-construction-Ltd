import Link from 'next/link';
import { heroData } from '../lib/data';

export default function HeroSection() {
  return (
    <section className="relative   min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-700 to-brand-800" />
      
      {/* প্যাটার্নের অপাসিটি একটু বাড়ানো হয়েছে যাতে টেক্সচার বোঝা যায় */}
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge - বর্ডার সাদা করা হয়েছে এবং টেক্সট আরও উজ্জ্বল করা হয়েছে */}
          <div className="inline-flex items-center gap-2 bg-accent-500/20 border border-white/20 px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-accent-300 rounded-full animate-pulse" />
            <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase">
              {heroData.badge}
            </span>
          </div>

          {/* Title - এটি ইতিমধ্যে white, তাই ঠিক আছে */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6">
            {heroData.title}
          </h1>

          {/* Subtitle - কালার আরও হালকা করে দেওয়া হয়েছে (brand-200/90 থেকে brand-100 এ নেওয়া হয়েছে) */}
          <p className="text-black text-base font-semibold sm:text-lg leading-relaxed max-w-2xl mb-10">
            {heroData.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/sazin-valves/products"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-brand-900 font-bold px-8 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/25 text-sm"
            >
              {heroData.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats row */}
          {/* ডিভাইডার লাইন স্পষ্ট করার জন্য white/10 থেকে white/20 করা হয়েছে */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-16 pt-8 border-t border-white/20">
            {heroData.stats.map((stat) => (
              <div key={stat.label}>
                {/* নম্বরগুলো আরও চকচকে করার জন্য accent-400 থেকে accent-300 করা হয়েছে */}
                <div className="text-accent-300 font-heading text-2xl sm:text-3xl font-bold">
                  {stat.num}
                </div>
                {/* লেবেলের কালার white/70 করা হয়েছে যাতে কালো দেখা না যায় */}
                <div className="text-white/70 text-[11px] tracking-[0.15em] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}