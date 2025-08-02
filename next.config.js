/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ forza Next.js a usare la cartella app/
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'ihexdbticbojrpnoauco.supabase.co', 
      }
    ],
  },
}

module.exports = nextConfig

