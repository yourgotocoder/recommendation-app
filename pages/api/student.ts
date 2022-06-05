// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/databaseClient";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

type Data = {
  message: string;
  error?: boolean;
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
    if (session && session.userId && typeof session.userId === "string") {
      const user = await collection.updateOne(
        { _id: new ObjectId(session.userId) },
        { $set: { ...req.body} },
        (err, numAffected) => {}
      );
      res.json({ message: "Interest collected" });
    } else {
      res.status(402).json({ error: true, message: "Not authenticated" });
    }
  }
}
