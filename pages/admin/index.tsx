import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const AdminPage: NextPage = () => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    console.log(authCtx, "From admin");
    if (authCtx.status == "unauthenticated") {
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
