/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Remove static export to allow dynamic API routes
  // output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: { unoptimized: true },
};

module.exports = nextConfig;
