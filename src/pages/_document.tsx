import { Head, Html, Main, NextScript } from "next/document";

export default function MyDocument() {
	return (
		<Html lang="en">
			<Head>
				{/* PWA primary color */}
				<meta content="#2a9d8f" name="theme-color" />
				<link href="/favicon.ico" rel="shortcut icon" />
				<link
					href="/apple-touch-icon.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link
					href="/favicon-32x32.png"
					rel="icon"
					sizes="32x32"
					type="image/png"
				/>
				<link
					href="/favicon-16x16.png"
					rel="icon"
					sizes="16x16"
					type="image/png"
				/>
				<link href="/site.webmanifest" rel="manifest" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
