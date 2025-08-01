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
        hostname: 'ihexdbticbojrpnoauco.supabase.co', // se usi immagini da Supabase Storage
      }
    ],
  },
}

module.exports = nextConfig

