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
  // 빌드 시 타입스크립트 오류 무시 (Vercel 빌드 완화)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Node.js 전용 패키지를 클라이언트 번들에서 제외
  serverExternalPackages: [
    'googleapis',
    'google-spreadsheet',
    'google-auth-library',
  ],
}

module.exports = withBundleAnalyzer(nextConfig)
