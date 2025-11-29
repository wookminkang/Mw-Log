const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "gscyihubyxyhdyqgnktm.supabase.co",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Node.js 전용 패키지를 클라이언트 번들에서 제외
  serverExternalPackages: [
    'googleapis',
    'google-spreadsheet',
    'google-auth-library',
  ],
}

module.exports = withBundleAnalyzer(nextConfig)
