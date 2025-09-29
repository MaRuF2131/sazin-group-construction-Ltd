// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">পেজ পাওয়া যায়নি</h2>
      <p className="mb-6 text-center max-w-md">
        আপনি যে লিঙ্কটি খুলতে চাচ্ছেন তা আর পাওয়া যাচ্ছে না অথবা সরানো হয়েছে।
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}
// This file is the custom 404 error page for the Next.js application.