import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male" });
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email is invalid"
            }
        },
        password: {
            isRequired: {
                message: "Password is required"
            },
            isCapitalSymbol: {
                message: "Password must contain at least one uppercase character"
            },
            isContainDigit: {
                message: "Password must contain at least one digit"
            },
            min: {
                message: "Password must contain at leasr 8 characters",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <SelectField label="Choose your profession" defaultOption="Choose..." options={professions} onChange={handleChange} value={data.profession} error={errors.profession} />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
        </form>
    );
};

export default RegisterForm;
