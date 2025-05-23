/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'luanatech.pe'
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1'
            }
        ]
    },
};

export default nextConfig;