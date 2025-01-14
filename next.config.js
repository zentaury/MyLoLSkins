/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
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
