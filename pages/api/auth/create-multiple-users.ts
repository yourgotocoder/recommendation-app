import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Process a POST request
apiRoute.post((req, res) => {
    res.status(200).json({ data: "success" });
});

export default apiRoute;
