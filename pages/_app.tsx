import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import AuthProvider from "@/contexts/AuthContext";
import { ConversationProvider } from "@/contexts/ConversationContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false, // default: true
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ConversationProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ConversationProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
