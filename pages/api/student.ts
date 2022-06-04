// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/databaseClient";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const session = await getSession({ req });
        console.log(session);
        const client = await connectToDatabase();
        const db = client.db();
        const collection = db.collection("user");
        const user = collection.findOne({ _id: ObjectId(session.userId) });
        res.json({ message: "Interest collected" });
    }
}
