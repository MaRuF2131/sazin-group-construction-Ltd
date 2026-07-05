"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  const limit = 9;

  // Fetch Products
  const fetchProducts = async (pageNo) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-valves?page=${pageNo}&limit=${limit}`
      );

      const result = await res.json();

      if (pageNo === 1) {
        setProducts(result.data);
      } else {
        setProducts((prev) => [...prev, ...result.data]);
      }

      if (pageNo >= result.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // First Load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const current = loaderRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading]);

  // Load More
  useEffect(() => {
    if (page === 1) return;

    fetchProducts(page);
  }, [page]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-brand-700 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-4xl text-white font-bold">
            Product Catalog
          </h1>
        </div>
      </div>

      <ProductSearch />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-10 font-semibold">
            Loading...
          </div>
        )}

        {/* No More */}
        {!hasMore && (
          <div className="text-center py-10 text-gray-500">
            No More Products
          </div>
        )}

        {/* Observer */}
        <div ref={loaderRef} className="h-10" />
      </div>
    </div>
  );
}