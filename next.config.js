/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ddragon.leagueoflegends.com"
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/app/sitemap.xml',
                destination: '/api/sitemap'
            }
        ];
    }
}

module.exports = nextConfig
