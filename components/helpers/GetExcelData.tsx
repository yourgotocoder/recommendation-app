import React, { useEffect, useRef } from "react";
import * as xlsx from "xlsx";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type Props = {
    onUpload: (data: any) => void;
};

const GetExcelData = (props: Props) => {
    const DnDAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        DnDAreaRef.current?.addEventListener("dragover", handleDragOver);
        DnDAreaRef.current?.addEventListener("drop", handleDrop);

        return () => {
            DnDAreaRef.current?.removeEventListener("dragover", handleDragOver);
            DnDAreaRef.current?.removeEventListener("drop", handleDrop);
        };
    }, []);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.dataTransfer?.types);
    };
    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer!;
        console.log(files);
    };

    const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event.target);
                if (event.target) {
                    const data = event.target.result;
                    const workbook = xlsx.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);
                    props.onUpload(json);
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: 400,
                flexWrap: "wrap",
                border: "1px dotted black",
                padding: "1rem",
            }}
            ref={DnDAreaRef}
        >
            <div>
                <p>Drag and drop file here</p>
            </div>
            <div>
                <input
                    type="file"
                    accept="xlsx"
                    style={{ display: "none" }}
                    onChange={readUploadFile}
                    id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                    >
                        <UploadFileIcon color="action" />
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default GetExcelData;
