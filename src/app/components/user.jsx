import React, { useState, useEffect } from "react";
import PropTyoes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const User = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(props.id).then(response => setUser(response));
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>{`completedMeetings: ${user.completedMeetings}`}</p>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button><Link to='/users'>Все пользователи</Link></button>
            </div>
        );
    };
    return "Loading...";
};

User.propTypes = {
    users: PropTyoes.array.isRequired,
    id: PropTyoes.string.isRequired
};

export default User;
