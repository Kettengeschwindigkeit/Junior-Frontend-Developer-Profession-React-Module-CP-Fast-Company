import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { getIsLoggedIn } from "../store/users";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    const { currentUser } = useAuth();

    return (
        <Route {...rest} render={(props) => {
            if (!isLoggedIn) {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
            } else if (rest.computedMatch.params.edit && (currentUser._id !== rest.computedMatch.params.userId)) {
                return <Redirect to={{ pathname: `/users/${currentUser._id}`, state: { from: props.location } }} />;
            } else {
                return Component ? <Component {...props} /> : children;
            }
        }} />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
