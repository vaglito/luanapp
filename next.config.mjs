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
            }
        ]
    },
};

export default nextConfig;
