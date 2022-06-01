import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectToDatabase from "../../../lib/databaseClient";
import { stringify } from "querystring";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export default NextAuth({
    secret: process.env.SECRET,
    pages: {
        signIn: "/signin",
        error: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 30 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const client = await connectToDatabase();
            const db = client.db();
            const collection = db.collection("user");
            const foundEmail = await collection.findOne({
                emailId: user.email,
            });
            if (foundEmail) {
                return true;
            } else {
                return false;
            }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
        async session({ session, token }) {
            if (token) {
                const client = await connectToDatabase();
                const collection = client.db().collection("user");
                const foundEmail = await collection.findOne({
                    emailId: token.email,
                });
                session.userId = foundEmail?._id.toString();
                session.role = foundEmail?.role;
            }
            return session;
        },
    },
    adapter: MongoDBAdapter(connectToDatabase()),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
});
