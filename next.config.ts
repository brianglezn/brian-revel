import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pics.filmaffinity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lumiere-a.akamaihd.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.magazinema.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'occ-0-1555-3212.1.nflxso.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static3.srcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'movierob.files.wordpress.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img2.rtve.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.filmin.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgtoolkit.culturebase.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.aullidos.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'terrigen-cdn-dev.marvel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'phantom-marca.unidadeditorial.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'occ-0-1555-116.1.nflxso.net',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://kata.conducerevel.com/films/:path*',
      },
    ];
  },
};

export default nextConfig;
