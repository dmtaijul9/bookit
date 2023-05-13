/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",

    CLOUDINARY_CLOUD_NAME: "dmtaijul9",
    CLOUDINARY_API_KEY: "845221367289486",
    CLOUDINARY_API_SECRET: "d92OdzN48WQCm6a75ruLl9rkQpc",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "blablablablabla",

    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
  },
  webpack5: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
