import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignInForm from "../components/SignIn";
import Loading from "../components/ui/Loading";
import LandingPageComponent from "../components/home/LandingPageComponent";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    let homeContent;

    if (status === "loading") {
        homeContent = <Loading />;
    }

    if (status === "unauthenticated") {
        homeContent = <LandingPageComponent />;
    }

    if (status === "authenticated" && session && session.role) {
        router.replace(`/${session.role}`);
    }

    if (router.query.error) {
        homeContent = (
            <>Link already used to login, please request for another link</>
        );
    }

    return (
        <>
            <Head>
                <title>CSE Recommendation App</title>
                <meta
                    name="description"
                    content="App to track papers written by students and get recommendation from faculty"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {homeContent}
        </>
    );
};

export default Home;
