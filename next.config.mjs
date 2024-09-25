/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'luanatech.pe'
            }
        ]
    }
};

export default nextConfig;
