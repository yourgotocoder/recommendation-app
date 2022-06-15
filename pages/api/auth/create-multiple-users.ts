import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import FormData from "form-data";
// import multer from "multer";

type ProcessedFiles = Array<[string, File]>;

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Process a POST request
apiRoute.post(async (req, res) => {
    const files = await new Promise<ProcessedFiles | undefined>(
        (resolve, reject) => {
            const form = new formidable.IncomingForm();
            const files: ProcessedFiles = [];
            form.on("file", (field, file) => {
                files.push([field, file]);
            });
            form.on("end", () => resolve(files));
            form.on("error", (err) => reject(err));
            form.parse(req, (err, fields, files) => {});
        }
    ).catch((error) => {
        console.log(error);
    });
    if (files?.length) {
        console.log(files[0]);
        res.status(200).json({ data: "success" });
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
