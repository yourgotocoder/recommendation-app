// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectToDatabase from "../../../lib/databaseClient";

type Data = {
  error: boolean;
  data?: any;
  message?: string 
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const session = await getSession({req});
    if (session && session.role === "admin") {
      const client = await connectToDatabase();
      const db = client.db();
      const collection = db.collection("user");
      const rawData = await collection.find().toArray();
      const data = rawData.filter(user => user.emailId !== session.user?.email);
      res.status(200).json({error: false, data});
    } else {
      res.status(401).json({error: true, message: "Authorization missing"})
    }
    return
  }
  res.status(200).json({ error: true, message: "HTTP method not allowed" });
}
