import React from "react";
import classes from "./MainLayout.module.css";
import NavbarComponent from "../nav/NavbarComponent";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <div className={classes["main-layout"]}>
            <NavbarComponent />
            {children}
        </div>
    );
};

export default MainLayout;
