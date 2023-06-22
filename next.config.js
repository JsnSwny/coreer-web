/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ["coreer-static.s3.amazonaws.com"],
	},
};

module.exports = nextConfig;
