import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import GetExcelData from "../../components/helpers/GetExcelData";
import AuthContext from "../../store/AuthContext";

const AdminPage: NextPage = () => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    console.log(authCtx, "From admin");

    if (authCtx.status == "unauthenticated") {
        router.replace("/");
    }

    const getExcelData = (data: any) => {
        console.log(data);
    };

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
                <GetExcelData onUpload={getExcelData} />
                <div></div>
            </main>

            <footer></footer>
        </div>
    );
};

export default AdminPage;
