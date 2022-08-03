import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import BookMark from "./bookmark";

const User = (props) => {
    return (
        <tr>
            <td>{props.user.name}</td>
            <td>
                {props.user.qualities.map((q) => (
                    <Quality key={q._id} color={q.color} name={q.name} />
                ))}
            </td>
            <td>{props.user.profession.name}</td>
            <td>{props.user.completedMeetings}</td>
            <td>{props.user.rate}</td>
            <td>
                <BookMark status={props.bookmark} onClick={() => props.onToggleBookmark(props._id)} />
            </td>
            <td>
                <button
                    className="btn btn-danger m-2"
                    onClick={() => props.onDelete(props.user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default User;
