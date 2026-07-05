"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const observerRef = useRef(null);

  const limit = 10;

  const fetchProducts = async (searchText, pageNo, reset = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-valves?search=${encodeURIComponent(
          searchText
        )}&page=${pageNo}&limit=${limit}`
      );

      const data = await res.json();

      if (reset) {
        setResults(data.data);
      } else {
        setResults((prev) => [...prev, ...data.data]);
      }

      setHasMore(pageNo < data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setPage(1);
      setHasMore(false);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setPage(1);
      fetchProducts(query, 1, true);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Infinite Scroll
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !loading
      ) {
        const next = page + 1;
        setPage(next);
        fetchProducts(query, next);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, loading, query]);

  return (
    <div ref={dropdownRef} className="relative w-full px-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setIsOpen(true)}
          className="w-full placeholder:text-black dark:placeholder:text-white border border-gray-200 dark:text-white text-black text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none transition-all"
        />

        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-xl bg-gray-800 max-h-[350px] overflow-y-auto z-50">

          {results.map((product) => (
            <Link
              key={product._id}
              href={`/sazin-valves/products/${product.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{product.emoji || "📦"}</span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-white font-semibold">
                  {product.name}
                </p>

                <p className="text-xs text-gray-300">
                  {product.shortDesc}
                </p>
              </div>
            </Link>
          ))}

          {loading && (
            <div className="text-center py-4 text-white">
              Loading...
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="text-center py-6 text-white">
              No Products Found
            </div>
          )}

          <div ref={observerRef} className="h-4"></div>
        </div>
      )}
    </div>
  );
}