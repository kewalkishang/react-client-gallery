/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {
                protocol : "https",
                hostname : '',
                port :'',
                pathname : '/u/**',
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
