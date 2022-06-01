import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading</p>;
    }

    if (status === "authenticated" && session && session.role) {
        router.replace(`/${session.role}`);
    }

    if (status === "unauthenticated") {
        router.replace("/");
    }

    return <></>;
};

export default SignIn;
