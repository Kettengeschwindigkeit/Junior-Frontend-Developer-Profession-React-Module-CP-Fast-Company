import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogIn, onLogOut, isAuth }) => {
    return (
        <>
            {isAuth ? <button onClick={onLogOut}>Выйти из системы</button> : <button onClick={onLogIn}>Войти</button>}
        </>
    );
};

SimpleComponent.propTypes = {
    onLogIn: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.string
};

export default SimpleComponent;
