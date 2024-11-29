/** @format */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/img/wn/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  }
}