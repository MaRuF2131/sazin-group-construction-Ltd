/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,

  images: {
    domains: ["images.unsplash.com","res.cloudinary.com","sazin.com.bd", "i.postimg.cc"],
    minimumCacheTTL: 60 * 60 * 24 * 60, // 60 days
    unoptimized: true, // keep next/image optimization ON
  },

  async headers() {
    return [
      {
        // 🧭 HTML pages – short cache (because content can change)
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=86400",
          },
        ],
      },
/*       {
        // ⚙️ Static JS/CSS files – 1 year immutable cache
         source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      }, */
      {
        // 🖼️ Images and 🎥 Videos in /public – 1 year cache
        source: "/(.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|mov|ogg))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;