import Link from 'next/link';
import { siteInfo, products } from '../lib/data';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-900 text-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-accent-500 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5 text-white">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2" />
                  <rect x="16" y="20" width="16" height="8" rx="1" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
              <div>
                <span className="text-white font-heading text-lg font-bold tracking-wider">SAZIN</span>
                <span className="block text-[9px] text-brand-400 tracking-[0.15em] uppercase">
                  Innovative Industries Ltd.
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-400 leading-relaxed">
              Your trusted partner for industrial valves and flow control solutions across Bangladesh.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-heading text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-brand-400 hover:text-accent-400 transition-colors duration-200"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Products', href: '/products' },
                { label: 'About Us', href: '/#about' },
                { label: 'Inquiry Cart', href: '/cart' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 text-base">📍</span>
                <span className="text-brand-400 leading-relaxed">{siteInfo.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-base">📞</span>
                <span className="text-brand-400">{siteInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-base">✉️</span>
                <a href={`mailto:${siteInfo.email}`} className="text-brand-400 hover:text-accent-400 transition-colors">
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-base">🌐</span>
                <span className="text-brand-400">{siteInfo.website}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-500">
            © {new Date().getFullYear()} {siteInfo.name} Innovative Industries Ltd. All rights reserved.
          </p>
          <p className="text-[11px] text-brand-600">
            Engineered for reliability · Compliant with EN & ISO standards
          </p>
        </div>
      </div>
    </footer>
  );
}