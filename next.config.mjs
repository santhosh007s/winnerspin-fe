/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/djcz1dyym/image/upload/**",
      },
    ],
  },
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://65.1.111.185//:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;