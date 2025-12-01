await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "cf.geekdo-images.com",
			},
			{
				hostname: "avatars.githubusercontent.com",
			},
			{
				hostname: "picsum.photos",
			},
			{
				hostname: "cloudflare-ipfs.com",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default config;
