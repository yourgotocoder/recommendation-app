import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>
                    Stock Management App | CSE | Designed By Sudarshan Rai
                </title>
                <meta charSet="UTF-8" />
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
