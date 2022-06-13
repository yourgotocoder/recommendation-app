import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useWorker } from "react-hooks-worker";

const createWorker = (): Worker =>
    new Worker("./excel.worker.js", { type: "module" });

type Props = {
    onUpload: (data: any) => void;
};

const GetExcelData = (props: Props) => {
    const DnDAreaRef = useRef<HTMLDivElement>(null);
    const [fileHover, setFileHover] = useState(false);
    const [fileTypeError, setFileTypeError] = useState(false);
    const [fileProcessing, setFileProcessing] = useState(false);
    const [file, setFile] = useState<string | ArrayBuffer | null>();
    const { result, error } = useWorker(createWorker, file);

    useEffect(() => {
        DnDAreaRef.current?.addEventListener("dragover", handleDragOver);
        DnDAreaRef.current?.addEventListener("drop", handleDrop);
        DnDAreaRef.current?.addEventListener("dragleave", handleDragLeave);

        return () => {
            DnDAreaRef.current?.removeEventListener("dragover", handleDragOver);
            DnDAreaRef.current?.removeEventListener("drop", handleDrop);
        };
    }, []);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFileHover(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFileHover(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer!;
        if (files) {
            readUploadFile(files[0]);
        }
        setFileHover(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            readUploadFile(e.target.files[0]);
        }
    };

    const readUploadFile = async (file: File) => {
        if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const data = event.target.result;
                    setFile(data);
                }
            };
            reader.readAsArrayBuffer(file);
            setFileTypeError(false);
        } else {
            setFileTypeError(true);
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
                    onChange={handleChange}
                    id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        disabled={fileProcessing}
                    >
                        <UploadFileIcon color="action" />
                    </Button>
                </label>
            </div>
            {fileTypeError && (
                <div style={{ color: "red" }}>
                    Bitch I can only accept .xlsx files
                </div>
            )}
            {fileHover && <p>Hovering</p>}
        </div>
    );
};

export default GetExcelData;
