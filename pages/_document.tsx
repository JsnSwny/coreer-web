import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Script
					id="tag-manager"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id=G-WR67K5QVL0'+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GT-5M8N3BN');`,
					}}
				></Script>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
