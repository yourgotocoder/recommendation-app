import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import CreateNewUserComponent from "../../components/admin/CreateNewUserComponent";

const AdminPage: NextPage = () => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();

    if (authCtx.status == "unauthenticated") {
        router.replace("/");
    }

    return (
        <>
            <Head>
                <title>CSE Recommendation App | Admin Section | SMIT</title>
                <meta
                    name="description"
                    content="Student region for getting recommendation approval"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "80vh",
                    }}
                >
                    <CreateNewUserComponent />
                </Box>
            </main>
        </>
    );
};

export default AdminPage;
