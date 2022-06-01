import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const AdminPage: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    console.log(session);
    if (status == "unauthenticated" && !session) {
        router.replace("/");
    }
    return (
        <div>
            <Head>
                <title>CSE Recommendation App | Admin Section | SMIT</title>
                <meta
                    name="description"
                    content="Student region for getting recommendation approval"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome to admin section</h1>

                <p>Get started by editing </p>

                <div></div>
            </main>

            <footer></footer>
        </div>
    );
};

export default AdminPage;
