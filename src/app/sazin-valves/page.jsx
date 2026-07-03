import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import { products } from './lib/data';
import Link from 'next/link';

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const others = products.filter((p) => !p.featured);

  return (
    <>
      <HeroSection />

      {/* Featured Products */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent-500 dark:text-white text-[11px] font-semibold tracking-[0.2em] uppercase">
                Our Products
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-700 mt-2">
                Industrial Valve Solutions
              </h2>
              <p className="text-gray-700 dark:text-white text-sm mt-2 max-w-lg">
                EN & ISO certified valves for water supply, fire protection, HVAC, and infrastructure projects.
              </p>
            </div>
            <Link
              href="/sazin-valves/products"
              className="hidden sm:inline-flex items-center gap-2 text-accent-600 dark:text-white hover:text-accent-700 font-semibold text-sm transition-colors shrink-0"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      {others.length > 0 && (
        <section className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading text-2xl font-bold text-brand-700 mb-10 text-center">
              Complete Product Range
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {others.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className=" mt-10 text-center">
              <Link
                href="/sazin-valves/products"
                className="inline-flex items-center gap-2 bg-brand-700 dark:text-white text-black font-semibold px-8 py-3 hover:bg-brand-800 transition-colors text-sm"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      <AboutSection />
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
            Need a Custom Valve Solution?
          </h2>
          <p className="text-brand-200/80 mb-10 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Contact our engineering team for customized valve specifications, bulk orders, and project-specific requirements. We deliver reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/25 text-sm"
            >
              Browse Full Catalog
            </Link>
            <a
              href="mailto:info@sazin.com.bd"
              className="border border-brand-400/60 text-white hover:bg-brand-600/50 font-medium px-8 py-3.5 transition-all duration-200 text-sm"
            >
              Contact Engineering Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}