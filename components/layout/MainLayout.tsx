import React from "react";
import classes from "./MainLayout.module.css";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return <div className={classes["main-layout"]}>{children}</div>;
};

export default MainLayout;
