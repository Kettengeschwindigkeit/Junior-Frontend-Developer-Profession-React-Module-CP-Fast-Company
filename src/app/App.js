import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then(response => setUsers(response));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    return (
        <>
            <Users users={users} onDelete={handleDelete} />
        </>
    );
};

export default App;
