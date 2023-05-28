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

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "496dc1bb136ccd",
    SMTP_PASSWORD: "d706aa1ca387ba",
    SMTP_FROM_NAME: "BookIT",
    SMTP_FROM_EMAIL: "noreply@bookit.com",

    STRIPE_API_KEY:
      "pk_test_51H00O0Jh6SwVaMyEYjSrQ32ubv9KHsfkFdiqvNnNBvriCkuLLqICmuoU4SXeGZW0KIX1bTotSL9liEZXPMnngvnW00fH0Fqwhj",
    STRIPE_SECRET_KEY:
      "sk_test_51H00O0Jh6SwVaMyELw46DECaWZyOIV6nDsy6Xs9aGpCNe8i9N23NhFJP0jZSKBraHK5mht040ctOptF1GvXOuZyi00o7AVnjYa",
    STRIPE_WEBHOOK_SECRET:
      "whsec_015f672666c49a6526ae8b349409207976215c00977d353da9880a42b73730c6",
  },
  webpack5: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
