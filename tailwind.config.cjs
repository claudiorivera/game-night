/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#2a9d8f",
					"primary-content": "#ffffff",
					secondary: "#e9c46a",
					accent: "#46237A",
					neutral: "#1f1f1f",
					"base-100": "#ffffff",
					info: "#485696",
					success: "#2a9d8f",
					warning: "#ff9f1c",
					error: "#a52422",
				},
			},
		],
	},
	plugins: [
		require("@headlessui/tailwindcss"),
		require("@tailwindcss/forms"),
		require("daisyui"),
	],
};
