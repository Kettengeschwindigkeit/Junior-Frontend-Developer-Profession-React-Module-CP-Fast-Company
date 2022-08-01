import React from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHeader from "./tableHeader";

const UsersTable = ({ users, onDelete, onSort, selectedSort }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { iter: "profession.name", name: "Профессия" },
        completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <tbody>
                {users.map((user) => (
                    <User user={user} onDelete={onDelete} key={user._id} />
                ))}
            </tbody>
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
