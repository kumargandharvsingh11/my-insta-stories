/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                hostname: 'http://localhost:3000',
            },
        ],
    },
};

export default nextConfig;
