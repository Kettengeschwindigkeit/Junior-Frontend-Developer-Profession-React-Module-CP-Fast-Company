import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";

const UsersTable = ({ users, onDelete, onSort, selectedSort, onToggleBookMark }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger m-2"
                >
                    delete
                </button>
            )
        }
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
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
