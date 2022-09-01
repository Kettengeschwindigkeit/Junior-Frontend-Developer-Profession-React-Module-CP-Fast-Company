import React, { useState, useEffect } from "react";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateSchema = yup.object().shape({
        password: yup
            .string()
            .required("Password field is required")
            .matches(
                /(?=.*[A-Z])/,
                "Password must contain at least one uppercase character"
            )
            .matches(
                /(?=.*[0-9])/,
                "Password must contain at least one digit"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Password must contain at least one special character !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Password must contain at leasr 8 characters"
            ),
        email: yup
            .string()
            .required("Email field is required")
            .email("Email is invalid")
    });

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Email field is required"
    //         },
    //         isEmail: {
    //             message: "Email is invalid"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Password field is required"
    //         },
    //         isCapitalSymbol: {
    //             message: "Password must contain at least one uppercase character"
    //         },
    //         isContainDigit: {
    //             message: "Password must contain at least one digit"
    //         },
    //         min: {
    //             message: "Password must contain at leasr 8 characters",
    //             value: 8
    //         }
    //     },
    //     profession: {
    //         isRequired: {
    //             message: "Profession field is required"
    //         }
    //     }
    // };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        // setErrors(errors);
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
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
            <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">Stay on</CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
        </form>
    );
};

export default LoginForm;
