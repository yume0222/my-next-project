/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.jsが外部画像の読み込みを制限しているため
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;
