import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useRef, useState } from "react";
import { BaseTextFieldProps } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const fieldOfInterest = [
    "Field 1",
    "Field 2",
    "Field 3",
    "Field 4",
    "Field 5",
    "Field 6",
    "Field 7",
    "Field 8",
    "Field 9",
    "Field 10",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const StudentPage: NextPage = () => {
    const theme = useTheme();
    const [fieldName, setFieldName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof fieldName>) => {
        const {
            target: { value },
        } = event;
        setFieldName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        console.log(value);
    };

    const handleDelete = (name: string) => {
        const index = fieldName.indexOf(name);
        console.log(index);
        const updatedFields = fieldName.filter((field) => field !== name);
        setFieldName(updatedFields);
    };

    const handleSubmit = async () => {
        if (fieldName.length === 3) {
            const transformedFieldNames = fieldName.reduce(
                (prevValue, currentValue, indexValue) => {
                    if (indexValue === 0) {
                        prevValue.Interest_1 = currentValue;
                    }
                    if (indexValue === 1) {
                        prevValue.Interest_2 = currentValue;
                    }
                    if (indexValue === 2) {
                        prevValue.Interest_3 = currentValue;
                    }
                    return prevValue;
                },
                {
                    Interest_1: "",
                    Interest_2: "",
                    Interest_3: "",
                }
            );
            const response = await fetch("/api/student", {
                method: "POST",
                body: JSON.stringify(transformedFieldNames),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response;
            console.log(data);
        }
    };

    return (
        <div>
            <Head>
                <title>CSE Recommendation App | Student Section | SMIT</title>
                <meta
                    name="description"
                    content="Student region for getting recommendation approval"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main
                style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <h1>Welcome to student section</h1>
                <Card
                    sx={{
                        minWidth: 400,
                        maxWidth: "60vw",
                        margin: "auto",
                        position: "absolute",
                        top: "40vh",
                        padding: 2,
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.primary"
                            gutterBottom
                        >
                            Lets get started with your fields of interest
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <FormControl sx={{ m: 1, width: "100%" }}>
                                <InputLabel id="demo-multiple-chip-label">
                                    {fieldName.length === 3
                                        ? "Max three interests allowed"
                                        : "Fields of interest"}
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={fieldName}
                                    onChange={handleChange}
                                    disabled={fieldName.length >= 3}
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label={
                                                fieldName.length === 3
                                                    ? "Max Fields of  interest allowed"
                                                    : "Fields of interest"
                                            }
                                        />
                                    }
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    color={
                                                        fieldName.length !== 3
                                                            ? "primary"
                                                            : "default"
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {fieldOfInterest.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                                name,
                                                fieldName,
                                                theme
                                            )}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box
                                sx={{
                                    display: "felx",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {fieldName.length === 0 && (
                                    <Typography
                                        sx={{
                                            color: "GrayText",
                                            fontSize: "0.8rem",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        **You can select multiple interests
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                listStyle: "none",
                                width: 300,
                                margin: "auto",
                            }}
                        >
                            {fieldName.length > 0 &&
                                fieldName.map((name, indexValue) => (
                                    <li
                                        key={name}
                                        style={{
                                            margin: "2px auto",
                                            padding: "2px",
                                            border: "1px solid #70AAE3 ",
                                            borderRadius: "6px",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                display: "inline-block",
                                                marginRight: 2,
                                            }}
                                        >
                                            Interest {indexValue + 1}
                                        </Typography>
                                        <Chip
                                            label={name}
                                            onDelete={() => handleDelete(name)}
                                            color="primary"
                                        />
                                    </li>
                                ))}
                        </Box>
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={fieldName.length !== 3}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </main>
        </div>
    );
};

export default StudentPage;
