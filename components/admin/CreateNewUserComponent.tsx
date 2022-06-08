import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const CreateNewUserComponent = (props: Props) => {
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUserType, setNewUserType] = useState("");

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userId, setUserId] = useState("");

  const [nameError, setNameError] = useState(true);
  const [emailIdError, setEmailIdError] = useState(true);
  const [userIdError, setUserIdError] = useState(false);

  const [verifyingUser, setVerifyingUser] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
    setVerificationError(false);
    setVerificationSuccess(false);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailId(e.target.value.trim());
    if (e.target.value.trim() !== "" && e.target.value.trim().includes("@")) {
      setEmailIdError(false);
    } else {
      setEmailIdError(true);
    }
  };

  const handleUserIdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserId(e.target.value);
    if (e.target.value !== "") {
      setUserIdError(false);
    } else {
      setUserIdError(true);
    }
  };

  const handleCreateUser = async () => {
    const newUser = {
      name,
      emailId,
      role: newUserType,
      [`${newUserType === "faculty" ? "empCode" : "regno"}`]: userId,
    };
    setVerifyingUser(true);
    const response = await fetch("/api/auth/create-user", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
      setVerifyingUser(false);
      setVerificationMessage(data.message);
      setVerificationError(true);
      setVerificationSuccess(false);
    } else {
      setVerifyingUser(false);
      setVerificationMessage(data.message);
      setName("");
      setEmailId("");
      setUserId("");
      setNameError(true);
      setEmailIdError(true);
      setUserIdError(true);
      setVerificationError(false);
      setVerificationSuccess(true);
    }
    console.log(data);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        padding: 3,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Create a new user
        </Typography>
      </CardContent>
      {creatingUser && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            disabled={verifyingUser}
          ></TextField>
          <TextField
            label={newUserType === "faculty" ? "Emp Code" : "Regno"}
            type="number"
            variant="outlined"
            sx={{ margin: "1rem 0" }}
            value={userId}
            onChange={handleUserIdChange}
            disabled={verifyingUser}
          ></TextField>
          <TextField
            label="Email Id"
            variant="outlined"
            sx={{ margin: "1rem 0" }}
            value={emailId}
            onChange={handleEmailChange}
            disabled={verifyingUser}
          ></TextField>
          <Box
            sx={{
              textAlign: "left",
              margin: "1rem 0",
            }}
          >
            Role:
            <Chip
              label={newUserType === "faculty" ? "faculty" : "student"}
              variant="outlined"
              sx={{ ml: 1 }}
            ></Chip>
          </Box>
          <Button
            variant="contained"
            disabled={nameError || userIdError || emailIdError || verifyingUser}
            onClick={handleCreateUser}
            sx={{ mb: 1 }}
          >
            Add User
          </Button>
          {verifyingUser && (
            <Box sx={{ margin: "2px auto" }}>
              <Card
                sx={{
                  padding: 2,
                  border: "none",
                  boxShadow: "none",
                  background: "rgba(75, 181, 67, 0.5)",
                }}
              >
                <CircularProgress />
                <Typography>
                  Verifying email and{" "}
                  {newUserType === "student" ? "regno" : "empCode"}
                </Typography>
              </Card>
            </Box>
          )}
          {(verificationError || verificationSuccess) && (
            <Alert
              severity={
                verificationError
                  ? "error"
                  : verificationSuccess
                  ? "success"
                  : "info"
              }
              sx={{ mt: 2 }}
            >
              {verificationMessage}
            </Alert>
          )}
        </Box>
      )}
      {!creatingUser && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setCreatingUser(true);
              setNewUserType("student");
            }}
          >
            Student
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setCreatingUser(true);
              setNewUserType("faculty");
            }}
          >
            Faculty
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CreateNewUserComponent;
