import React from "react";
import PropTypes, { string } from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: string
};

export default TextField;
