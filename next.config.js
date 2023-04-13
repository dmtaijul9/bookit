/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",
  },
  webpack5: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
