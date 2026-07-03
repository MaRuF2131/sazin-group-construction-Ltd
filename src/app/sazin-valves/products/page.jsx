import { searchProducts, products } from '../lib/data';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import ProductSearch from '../components/ProductSearch';

export const metadata = { title: 'Products — SAZIN Valves' };

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const query = sp.q || '';
  const filtered = query ? searchProducts(query) : products;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className=" min-h-screen">
      {/* Header */}
      <div className="bg-brand-700 py-14 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">Product Catalog</h1>
          <p className="text-brand-200/80 mt-2 text-sm">
            {query
              ? `Search results for "${query}" — ${filtered.length} item(s) found`
              : `Showing all ${filtered.length} industrial valve products`}
          </p>
          {query && (
            <a href="/products" className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-sm mt-3 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Clear search
            </a>
          )}
        </div>
      </div>

      <ProductSearch></ProductSearch>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category quick links */}
        {!query && (
          <div className="flex flex-wrap gap-2 mb-10">
            <a href="/sazin-valves/products" className="text-xs font-medium px-4 py-2 bg-brand-700 text-white transition-colors">
              All ({products.length})
            </a>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              const label = products.find((p) => p.category === cat)?.name || cat;
              return (
                <a
                  key={cat}
                  href={`/sazin-valves/products/${cat}`}
                  className="text-xs font-medium px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:border-accent-400 hover:text-accent-600 transition-colors"
                >
                  {label} ({count})
                </a>
              );
            })}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-5 opacity-30">🔍</div>
            <h3 className="font-heading text-xl font-semibold text-brand-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-400 text-sm">Try a different search term or browse all products.</p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-brand-700 text-white font-medium px-6 py-2.5 text-sm hover:bg-brand-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}