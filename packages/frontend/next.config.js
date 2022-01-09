/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['localhost', 'ipfs.io', 'gateway.ipfs.io'],
  },
  async redirects() {
    return [
      ...(process?.env?.NEXT_PUBLIC_PRODUCTION_MODE === 'true' ? [
        {
          source: '/',
          destination: 'https://twitter.com/dennis_zoma',
          permanent: false,
        }
      ] : []),
    ]
  },
}

module.exports = nextConfig
