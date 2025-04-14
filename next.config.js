/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
	transpilePackages: ["next-auth"],
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
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default config;
