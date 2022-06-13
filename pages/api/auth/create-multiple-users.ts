import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
// import multer from "multer";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Process a POST request
apiRoute.post((req, res) => {
    console.log(req.body);
    res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
