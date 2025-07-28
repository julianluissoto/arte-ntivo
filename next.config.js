// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // ¡Añadido Cloudinary aquí!
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Mantenemos RandomUser.me
        port: '',
        pathname: '/**',
      },
      // Puedes añadir más objetos si tienes imágenes de otros dominios
    ],
  },
};

module.exports = nextConfig;