import React, { useState } from "react";
import { signIn } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./SignIn.module.css";

type SingInData = {
    error: string;
    ok: boolean;
    status: number;
    url: string | null;
};

const SignInForm = () => {
    const [emailInputValue, setEmailInputValue] = useState("");

    const [emailInputError, setEmailInputError] = useState("");

    const [loginState, setLoginState] = useState<SingInData>();

    const [logginIn, setLogginIn] = useState(false);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (emailInputValue.trim().length === 0) {
            setEmailInputError("Enter Email");
            return;
        }

        if (!emailInputValue.trim().includes("@")) {
            setEmailInputError("Enter a valid email");
            return;
        }

        setLogginIn(true);

        const loginData = await signIn("email", {
            email: emailInputValue,
            redirect: false,
        });

        setLoginState(loginData);

        if (loginData) {
            setLogginIn(false);
        }
    };

    const resetLoginState = () => {
        setLoginState(undefined);
        setEmailInputValue("");
    };

    let emailForm;

    if (!logginIn) {
        emailForm = (
            <>
                <TextField
                    error={
                        emailInputError === "Enter Email" ||
                        emailInputError === "Enter a valid email"
                    }
                    fullWidth
                    type="email"
                    id="email"
                    style={{ width: "100" }}
                    name="email"
                    label={
                        emailInputError === "Enter Email"
                            ? "Field cannot be empty"
                            : emailInputError === "Enter a valid email"
                            ? "Email Invalid"
                            : "Email"
                    }
                    onFocus={() => setEmailInputError("")}
                    value={emailInputValue}
                    onChange={(event) => setEmailInputValue(event.target.value)}
                    required
                />

                <Button onClick={handleSubmit} variant="outlined">
                    Get sign-in link
                </Button>
            </>
        );
    }

    if (logginIn && !loginState) {
        emailForm = (
            <>
                <div className={classes["verifying-email"]}>
                    <div>
                        Verifying{" "}
                        <span style={{ fontWeight: "bolder" }}>
                            {emailInputValue}
                        </span>
                    </div>
                    <div className={classes["verifying-email-progress"]}>
                        <CircularProgress />
                    </div>
                </div>
            </>
        );
    }

    if (!logginIn && loginState?.url) {
        emailForm = (
            <div className={classes["verification-success"]}>
                A sign-in link has been sent to <span>{emailInputValue}</span>, please login
                using that link
            </div>
        );
    }

    if (!logginIn && loginState?.error) {
        emailForm = (
            <div className={classes["verification-failed"]}>
                <div>{loginState.error}</div>
                <Button onClick={resetLoginState} variant="outlined">
                    Enter a valid email
                </Button>
            </div>
        );
    }

    return <div>{emailForm}</div>;
};

export default SignInForm;
