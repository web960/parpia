const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  transpilePackages: ["three"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "",
      },
      {
        protocol: "https",
        hostname: "parpiagold.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
