import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WR67K5QVL0" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WR67K5QVL0');
        `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
