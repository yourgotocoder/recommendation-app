import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    userId?: string | null | undefined;
    role?: string | null | undefined;
    name?: string | null | undefined;
    user?: { email?: string | null | undefined };
    image?: string | null | undefined;
    status: "authenticated" | "unauthenticated" | "loading";
};

const AuthContext = createContext<AuthContextType>({
    userId: undefined,
    role: undefined,
    name: undefined,
    user: { email: undefined },
    image: undefined,
    status: "loading",
});

type Props = {
    children: React.ReactNode;
};

export function AuthContextProvider(props: Props) {
    // const [userData, setUserData] = useState<AuthContextType>();
    const { data: session, status } = useSession();

    const context = {
        ...session,
        status,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
