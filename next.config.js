/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ["127.0.0.1", "localhost"],
	eslint: {
		// Avoid CI failures due to ESLint plugin resolution on Vercel.
		ignoreDuringBuilds: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		// Reduce bundle size by optimizing ESM imports from large UI libs
		optimizePackageImports: ["@heroui/react", "@iconify/react", "usehooks-ts"],
	},
};

module.exports = nextConfig;
