/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,

	/**
	 * If you have the "experimental: { appDir: true }" setting enabled, then you
	 * must comment the below `i18n` config out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
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
