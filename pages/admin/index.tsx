import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEventHandler, InputHTMLAttributes, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import * as xlsx from "xlsx";

const AdminPage: NextPage = () => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    console.log(authCtx, "From admin");
    if (authCtx.status == "unauthenticated") {
        router.replace("/");
    }

    const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event.target);
                if (event.target) {
                    const data = event.target.result;
                    const workbook = xlsx.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);
                    console.log(json);
                    console.log("file uploaded");
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        console.log("Change event triggered");
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
                <div>
                    Upload
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                    />
                </div>

                <div></div>
            </main>

            <footer></footer>
        </div>
    );
};

export default AdminPage;
