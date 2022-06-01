import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignInForm from "../components/SignIn";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading</p>;
    }

    if (status === "authenticated" && session && session.user) {
        router.replace("/admin");
    }

    if (router.query.error) {
        return <>Link already used to login, please request for another link</>;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>CSE Recommendation App</title>
                <meta
                    name="description"
                    content="App to track papers written by students and get recommendation from faculty"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <SignInForm />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
