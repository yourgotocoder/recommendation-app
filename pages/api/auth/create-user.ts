import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectToDatabase from "../../../lib/databaseClient";

type Data = {
  message: string;
};

type CreationError = {
  error: boolean;
  message: string;
};

type NewUser = {
  name: string;
  empCode?: string;
  regno?: string;
  emailId: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | CreationError>
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({
        error: true,
        message:
          "Unauthorized! You dont't have the proper permissions for this action.",
      });
      return;
    }
    const { name, emailId, role, regno, empCode }: NewUser = req.body;
    if (
      !name ||
      name.trim().length === 0 ||
      !emailId ||
      !emailId.includes("@") ||
      !role ||
      role.trim().length === 0
    ) {
      res.status(422).json({
        error: true,
        message: "Failed to create a user",
      });
      return;
    }
    if (session.role === "admin") {
      const client = await connectToDatabase();
      const db = client.db();
      const collection = db.collection("user");
      const emailAlreadyExists = await collection.findOne({ emailId });
      let regnoAlreadyExists;
      let empCodeAlreadyExists;
      if (regno) {
        regnoAlreadyExists = await collection.findOne({ regno });
      }
      if (empCode) {
        empCodeAlreadyExists = await collection.findOne({ empCode });
      }
      if (emailAlreadyExists) {
        res.json({ error: true, message: "Email already exists" });
        return;
      } else if (regnoAlreadyExists) {
        res.json({ error: true, message: "Regno already exists" });
        return;
      } else if (empCodeAlreadyExists) {
        res.json({ error: true, message: "Empcode already exists" });
        return;
      } else {
        const newUser = await collection.insertOne(req.body);
        res.status(200).json({ error: false, message: "Created User" });
        return;
      }
    }

    res.status(500).json({ error: true, message: "Something went wrong" });
  }
}
