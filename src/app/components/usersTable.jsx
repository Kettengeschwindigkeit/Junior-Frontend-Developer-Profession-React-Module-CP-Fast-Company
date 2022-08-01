import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UsersTable = ({ users, onDelete, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное" },
        delete: {}
    };

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
            {/* <tbody>
                {users.map((user) => (
                    <User user={user} onDelete={onDelete} key={user._id} />
                ))}
            </tbody> */}
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
