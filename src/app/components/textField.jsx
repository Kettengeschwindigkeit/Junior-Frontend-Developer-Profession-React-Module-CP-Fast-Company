import React from "react";
import PropTypes, { string } from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <input className={getInputClasses()} type={type} id={name} name={name} value={value} onChange={onChange} />
            {error && <div className="invalid-feedback">{error}</div>}
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
