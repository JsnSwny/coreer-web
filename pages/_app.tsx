import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import AuthProvider from "@/contexts/AuthContext";
import { ConversationProvider } from "@/contexts/ConversationContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
