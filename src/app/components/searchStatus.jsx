import React from "react";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
    if (props.users.length === 0) {
        return (
            <span className="badge bg-danger">Никто с тобой не тусанет</span>
        );
    } else if (
        props.users.length === 2 || props.users.length === 3 || props.users.length === 4
    ) {
        return (
            <span className="badge bg-primary">
                {props.users.length} человека тусанут с тобой сегодня
            </span>
        );
    } else {
        return (
            <span className="badge bg-primary mb-2">
                {props.users.length} человек тусанет с тобой сегодня
            </span>
        );
    };
};

SearchStatus.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchStatus;
