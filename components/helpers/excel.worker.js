import * as xlsx from "xlsx";
import { exposeWorker } from "react-hooks-worker";

const convertToJSON = (data) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target) {
            const data = event.target.result;
            const workbook = xlsx.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
        }
    };
    reader.readAsArrayBuffer(file);
};

exposeWorker(convertToJSON);
