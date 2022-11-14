import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    const params = useParams();

    const { userId, edit } = params;

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    if (!dataStatus) return "Loading";

    return (
        <>
            <UserProvider>
                {userId ? edit ? <EditUserPage userId={userId} /> : <UserPage userId={userId} /> : <UsersListPage />}
            </UserProvider>
        </>
    );
};

export default Users;
