import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import UserProvider from "../hooks/useUsers";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUseId = useSelector(getCurrentUserId());

    return (
        <UsersLoader>
            <UserProvider>
                {userId ? edit ? userId === currentUseId ? <EditUserPage userId={userId} /> : <Redirect to={`/users/${currentUseId}/edit`} /> : <UserPage userId={userId} /> : <UsersListPage />}
            </UserProvider>
        </UsersLoader>
    );
};

export default Users;

// =====================================================================================================================================================================================================

// import React from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import EditUserPage from "../components/page/editUserPage/editUserPage";
// import UserPage from "../components/page/userPage";
// import UsersListPage from "../components/page/usersListPage";
// import UsersLoader from "../components/ui/hoc/usersLoader";
// import UserProvider from "../hooks/useUsers";
// import { getCurrentUserId } from "../store/users";

// const Users = () => {
//     const params = useParams();
//     const { userId, edit } = params;

//     return (
//         <UsersLoader>
//             <UserProvider>
//                 {userId ? edit ? <EditUserPage userId={userId} /> : <UserPage userId={userId} /> : <UsersListPage />}
//             </UserProvider>
//         </UsersLoader>
//     );
// };

// export default Users;
