/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ["127.0.0.1", "localhost"],
	eslint: {
		// Avoid CI failures due to ESLint plugin resolution on Vercel.
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
