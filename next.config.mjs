/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8070",
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },
};

export default nextConfig;
