// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 번들 분석기 (선택사항)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = { fs: false, net: false, tls: false };
  //   }
  //   return config;
  // },
  
  // 불필요한 콘솔 제거
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig