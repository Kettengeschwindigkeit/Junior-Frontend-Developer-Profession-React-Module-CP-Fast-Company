import React from "react";
import CardWrapper from "../common/Card";

const withFunctions = (Component) => () => {
    const isAuth = localStorage.getItem("auth");

    const onLogIn = () => {
        localStorage.setItem("auth", "token");
    };

    const onLogOut = () => {
        localStorage.removeItem("auth");
    };

    return (
        <CardWrapper>
            <Component isAuth={isAuth} onLogIn={onLogIn} onLogOut={onLogOut} />
        </CardWrapper>
    );
};

export default withFunctions;
