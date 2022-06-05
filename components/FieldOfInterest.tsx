import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  Interest_1: string;
  Interest_2: string;
  Interest_3: string;
};

const FieldOfInterest = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{marginBottom: 2}}>Your fields of interest</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={props.Interest_1} color="primary"/>
          <Chip label={props.Interest_2}  color="primary"/>
          <Chip label={props.Interest_3}  color="primary"/>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FieldOfInterest;
