import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectToDatabase from "../../../lib/databaseClient";

type Data = {
    message: string;
};

type CreationError = {
    error: true;
    message: string;
};

type NewUser = {
    name: string;
    empCode: string;
    emailId: string;
    role: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | CreationError>
) {
    if (req.method === "POST") {
        // const session = await getSession({ req });
        // if (!session) {
        //     res.status(401).json({
        //         error: true,
        //         message:
        //             "Unauthorized (You dont't have the proper permissions for this action)",
        //     });
        //     return;
        // }
        const { name, emailId, empCode, role }: NewUser = req.body;
        console.log(role);
        const client = await connectToDatabase();
        const db = client.db();
        const collection = db.collection("user");
        // const foundUser = await collection.findOne({ emailId: email });
        // if (foundUser && foundUser.role === "admin") {
        if (
            !name ||
            name.trim().length === 0 ||
            !emailId ||
            !emailId.includes("@smit.smu.edu.in") ||
            !empCode ||
            !role ||
            role.trim().length === 0
        ) {
            res.status(422).json({
                error: true,
                message: "Failed to create a user",
            });
            return;
        }
        const newUser = await collection.insertOne({
            emailId,
            name,
            empCode,
            role,
        });
        res.status(200).json({ message: "Created User" });
        return;
        // }
        // res.status(500).json({ message: "Something went wrong" });
    }
}
