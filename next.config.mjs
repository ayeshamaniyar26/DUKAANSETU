/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next_temp',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
