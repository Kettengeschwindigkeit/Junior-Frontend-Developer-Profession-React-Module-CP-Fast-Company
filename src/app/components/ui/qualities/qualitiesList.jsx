import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../../store/qualities";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());

    if (isLoading) return "Loading...";

    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
