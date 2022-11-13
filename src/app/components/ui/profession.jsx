import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";

export const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id));
    const { isLoading } = useSelector(state => state.professions);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};
