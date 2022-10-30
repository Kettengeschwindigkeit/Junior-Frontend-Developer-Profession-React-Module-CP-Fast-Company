import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [profession, setProfession] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getProfessionsList();
    }, []);

    function getProfession(id) {
        return profession.find((p) => p._id === id);
    };

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfession(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };

    return <ProfessionContext.Provider value={{ isLoading, profession, getProfession }}>{children}</ProfessionContext.Provider>;
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};