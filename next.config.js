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
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // 1. Externaliza los paquetes conflictivos para que Next.js 14 los cargue en tiempo de ejecución
  experimental: {
    serverComponentsExternalPackages: [
      'genkit',
      '@genkit-ai/core',
      '@genkit-ai/ai',
      '@genkit-ai/googleai',
      '@genkit-ai/next',
      '@opentelemetry/sdk-node',
      'handlebars'
    ],
  },

  // 2. Le dice a Webpack que ignore las llamadas de telemetría dinámica que rompen el despliegue
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'require-in-the-middle': 'commonjs require-in-the-middle',
        'shimmer': 'commonjs shimmer',
      });
    }
    return config;
  },
};

module.exports = nextConfig;