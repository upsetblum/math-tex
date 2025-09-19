/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // Disable output file tracing which causes the build error
  outputFileTracing: false,
  swcMinify: true,
}

module.exports = nextConfig
