import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'luanatech.pe' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/media/**', },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**', },
      { protocol: 'https', hostname: 'media.corporacionluana.pe' },
    ],
  },
};

export default withMDX({
  extension: /\.mdx$/,
})(nextConfig);
