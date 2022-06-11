import React, { useEffect } from "react";

type Props = {};

const ViewUsers = (props: Props) => {
  useEffect(() => {
    fetch("/api/auth/get-users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>ViewUsers</div>;
};

export default ViewUsers;
