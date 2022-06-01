import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import FooterComponent from "../components/footer/FooterComponent";
import MainLayout from "../components/layout/MainLayout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>
                    Stock Management App | CSE | Designed By Sudarshan Rai
                </title>
                <meta charSet="UTF-8" />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
            <FooterComponent />
        </SessionProvider>
    );
}

export default MyApp;
