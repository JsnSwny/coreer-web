import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
	return (
		<Html lang="en">
			<Head />
			{/* <script
				async
				src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
			></script> */}
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
