import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUseId = useSelector(getCurrentUserId());

    return (
        <UsersLoader>
            {userId ? edit ? userId === currentUseId ? <EditUserPage userId={userId} /> : <Redirect to={`/users/${currentUseId}/edit`} /> : <UserPage userId={userId} /> : <UsersListPage />}
        </UsersLoader>
    );
};

export default Users;
