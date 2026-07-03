import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../lib/data';
import SpecTable from '../../components/SpecTable';
import ProductCard from '../../components/ProductCard';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product ? `${product.name} — SAZIN Valves` : 'Not Found' };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const sizeSpec = product.specs?.find((s) => s.label === 'Size Range');
  const pressureSpec = product.specs?.find((s) => s.label === 'Pressure Rating');
  const tempSpec = product.specs?.find((s) => s.label === 'Temperature Range');
  const connSpec = product.specs?.find((s) => s.label === 'Connection');
  const operationSpec = product.specs?.find((s) => s.label === 'Operation');
  const quickSpecs = [sizeSpec, pressureSpec, tempSpec, connSpec, operationSpec].filter(Boolean);

  return (
    <div className=" min-h-screen">

      {/* ── Top Bar ── */}
      <div className="bg-brand-900 text-white text-[11px] tracking-wider uppercase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <span>EN & ISO Certified Industrial Valves</span>
          <span>www.sazin.com.bd</span>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-[13px]">
            <Link href="/sazin-valves" className="text-white hover:text-accent-500 transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/sazin-valves/products" className="text-white hover:text-accent-500 transition-colors">Products</Link>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-brand-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          HERO — Product Image + Info
         ══════════════════════════════════════════════════ */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* ── Left: Image Area (7 cols) ── */}
            <div className="lg:col-span-7">
              <div className="bg-brand-900 border border-brand-800 overflow-hidden shadow-2xl shadow-brand-950/20 relative group">
                
                {/* Background Layers: Blueprint Grid */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Background Layers: Diagonal Tech Lines */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    rgba(255,255,255,0.03) 20px,
                    rgba(255,255,255,0.03) 21px
                  )`
                }} />

                {/* Center Spotlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-accent-400/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/10 rounded-full blur-[60px]" />

                {/* Floating HUD Elements */}
                {/* Top Left Data Chip */}
                <div className="absolute top-6 left-6 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 font-mono z-10">
                  <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-0.5">Model</div>
                  <div className="text-sm text-white font-semibold tracking-wide">{product.name}</div>
                </div>

                {/* Top Right Status Chip */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-500/10 backdrop-blur-sm border border-green-500/20 px-4 py-2 z-10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-bold tracking-wider uppercase">Active</span>
                </div>

                {/* Bottom Left Specs Chip */}
                <div className="absolute bottom-24 left-6 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 font-mono z-10">
                  <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-0.5">Range</div>
                  <div className="text-sm text-accent-400 font-semibold">{sizeSpec?.value || 'DN40-DN600'}</div>
                </div>

                {/* Bottom Right Pressure Chip */}
                <div className="absolute bottom-24 right-6 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 font-mono text-right z-10">
                  <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-0.5">Pressure</div>
                  <div className="text-sm text-white font-semibold">{pressureSpec?.value || 'PN16'}</div>
                </div>

                {/* Center Crosshair Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.04] z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04] z-0" />

                {/* Orbit Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-dashed border-white/[0.08] rounded-full z-0 animate-[spin_30s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-dashed border-white/[0.05] rounded-full z-0 animate-[spin_50s_linear_infinite_reverse]" />

                {/* Viewfinder Corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent-500/50 z-10" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent-500/50 z-10" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent-500/50 z-10" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent-500/50 z-10" />

                {/* Main Product Emoji Area */}
                <div className="aspect-[4/3] lg:aspect-square flex items-center justify-center relative z-10">
                  <span className="text-[120px] sm:text-[150px] lg:text-[180px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105 select-none">
                    {product.emoji}
                  </span>
                </div>
              </div>

              {/* Quick specs strip below image */}
              <div className="grid grid-cols-5 bg-brand-900 border-x border-b border-brand-800">
                {quickSpecs.map((spec, i) => (
                  <div key={spec.label} className={`p-3 lg:p-4 text-center ${i < quickSpecs.length - 1 ? 'border-r border-brand-800' : ''}`}>
                    <div className="text-[9px] text-brand-400 uppercase tracking-[0.15em] font-medium mb-1 truncate">
                      {spec.label}
                    </div>
                    <div className="text-[11px] lg:text-xs text-white font-semibold leading-tight">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Info (5 cols) ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-1.5 mb-5">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                <span className="text-[11px] text-gray-500 font-semibold tracking-[0.15em] uppercase">
                  {product.category.replace(/-/g, ' ')}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-brand-900 leading-[1.1] mb-5 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= 4 ? 'text-accent-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400">Industrial Grade</span>
                <span className="text-gray-200">|</span>
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  In Stock
                </span>
              </div>

              <p className="text-gray-500 leading-[1.8] text-[14px] mb-7">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-7">
                {product.compliance?.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-[11px] font-semibold px-3 py-1.5 border border-brand-100">
                    <svg className="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {c}
                  </span>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium block mb-1">Price</span>
                    <span className="text-3xl font-bold text-brand-900">Request Quote</span>
                  </div>
                  <span className="text-[11px] text-gray-400 bg-gray-50 px-3 py-1.5 border border-gray-200">Price on request</span>
                </div>

                <p className="text-[11px] text-white mt-3 text-center leading-relaxed">
                  Free quotation within 24 hours · No minimum order quantity
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                {[
                  { icon: '🚚', label: 'Fast Delivery' },
                  { icon: '🛡️', label: 'Warranty' },
                  { icon: '📞', label: '24/7 Support' },
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <div className="text-lg mb-1">{t.icon}</div>
                    <div className="text-[10px] text-gray-400 font-medium tracking-wide">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DETAILS TABS
         ══════════════════════════════════════════════════ */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          <div className="text-center mb-14">
            <span className="text-accent-500 text-[11px] font-semibold tracking-[0.25em] uppercase">Product Details</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-2">Complete Technical Information</h2>
            <div className="w-10 h-0.5 bg-accent-500 mx-auto mt-4" />
          </div>

          {/* Specs Table */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-brand-700 flex items-center justify-center text-white text-xs font-bold">01</div>
              <h3 className="font-heading text-xl font-semibold text-brand-900">Technical Specifications</h3>
            </div>
            <div className=" border border-gray-200 overflow-hidden shadow-sm">
              <SpecTable specs={product.specs} />
            </div>
          </div>

          {/* Two columns */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {product.applications?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-brand-700 flex items-center justify-center text-white text-xs font-bold">02</div>
                  <h3 className="font-heading text-xl font-semibold text-brand-900">Applications</h3>
                </div>
                <div className="space-y-2.5">
                  {product.applications.map((app, i) => (
                    <div key={app} className="flex items-center gap-4  p-4 border border-gray-100 hover:border-accent-400/50 hover:shadow-sm transition-all duration-200 group">
                      <div className="w-7 h-7 bg-accent-50 text-accent-600 flex items-center justify-center text-[11px] font-bold shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="text-sm text-white font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-brand-700 flex items-center justify-center text-white text-xs font-bold">03</div>
                <h3 className="font-heading text-xl font-semibold text-brand-900">Key Materials</h3>
              </div>
              <div className="space-y-2.5">
                {product.specs
                  .filter((s) => ['Body', 'Disc', 'Seat', 'Stem', 'Diaphragm / Seal', 'Internal Trim', 'Screen', 'Gate (Wedge)'].includes(s.label))
                  .map((mat) => (
                    <div key={mat.label} className="flex items-center justify-between  p-4 border border-gray-100 hover:border-accent-400/50 hover:shadow-sm transition-all duration-200">
                      <span className="text-sm text-white font-medium">{mat.label}</span>
                      <span className="text-sm text-brand-700 font-semibold">{mat.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Compliance Banner */}
          {product.compliance?.length > 0 && (
            <div className="relative overflow-hidden bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-accent-500 flex items-center justify-center text-white text-xs font-bold">04</div>
                  <h3 className="font-heading text-xl font-semibold text-white">Compliance & Certification</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.compliance.map((c) => (
                    <div key={c} className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm text-white text-sm font-medium px-5 py-3 border border-white/[0.12]">
                      <svg className="w-4 h-4 text-accent-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RELATED PRODUCTS
         ══════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent-500 dark:text-white text-[11px] font-semibold tracking-[0.25em] uppercase">You May Also Like</span>
                <h2 className="font-heading dark:text-white text-2xl sm:text-3xl font-bold text-brand-900 mt-2">Related Products</h2>
              </div>
              <Link href="/sazin-valves/products" className="hidden sm:inline-flex items-center gap-2 text-accent-600 dark:text-white hover:text-accent-700 font-semibold text-sm transition-colors">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          CTA
         ══════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 relative overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-accent-500/[0.06] rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-accent-400 text-[11px] font-semibold tracking-[0.2em] uppercase">Ready to Order?</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Get a Quote for {product.name}</h2>
          <p className="text-brand-200/70 max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">Send us your requirements and our engineering team will provide a detailed quotation within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:info@sazin.com.bd?subject=Quote Request - ${product.name}`} className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/25 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Request Quotation
            </a>
            <a href={`tel:+8801XXXXXXXXX`} className="inline-flex items-center gap-2 border border-brand-500 text-brand-100 hover:bg-brand-700 hover:text-white font-medium px-8 py-3.5 transition-all duration-200 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}