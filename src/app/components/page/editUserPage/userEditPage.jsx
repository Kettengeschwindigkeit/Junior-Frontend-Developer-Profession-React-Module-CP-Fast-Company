import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = ({ userId }) => {
    const [data, setData] = useState({
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    console.log(data.qualities);
    console.log(data.profession);

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };

    const getProfessionById = (profession) => {
        for (const prof of professions) {
            if (prof.value === profession._id) {
                return { value: prof.value, label: prof.label };
            }
        }
    };
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    const getQualities = (elements) => {
        console.log(elements);
        const qualitiesArray = [];
        for (const elem of elements) {
            console.log(elem);
            for (const quality in qualities) {
                console.log(quality);
                console.log(qualities);
                console.log(qualities[quality]);
                if (elem._id === qualities[quality].value) {
                    qualitiesArray.push({
                        value: qualities[quality].value,
                        label: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
            console.log(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязателен для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     },
    //     profession: {
    //         isRequired: {
    //             message: "Обязательно выберите вашу профессию"
    //         }
    //     },
    //     licence: {
    //         isRequired: {
    //             message:
    //                 "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
    //         }
    //     }
    // };
    // useEffect(() => {
    //     validate();
    // }, [data]);
    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    // const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return (
        <>
            {data &&
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professions}
                        name="profession"
                        onChange={handleChange}
                        value={data.profession}
                        error={errors.profession}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={getQualities(data.qualities)}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        // disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>}
        </>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditPage;

// ===========================================================================================================================================================

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import api from "../../../api";

// const UserEditPage = ({ userId }) => {
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         profession: {},
//         sex: "male"
//     });
//     const [professions, setProfession] = useState({});

//     useEffect(() => {
//         api.users.getById(userId).then((data) => setData(data));
//         api.professions.fetchAll().then((data) => setProfession(data));
//     }, []);

//     console.log(data);

//     const handleChange = (e) => {
//         setData(e.target.value);
//         console.log(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 shadow p-4">
//                     {data
//                         ? <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label className="form-label" htmlFor="name">Имя</label>
//                                 <div className="input-group">
//                                     <input className="form-control" type="text" name="name" value={data.name} onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="form-label" htmlFor="email">Электронная почта</label>
//                                 <div className="input-group">
//                                     <input className="form-control" type="text" name="email" value={data.email} onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="form-label" htmlFor="profession">Выбери свою профессию</label>
//                                 <select className="form-select" name="profession" id="profession">
//                                     {Object.keys(professions).length > 0 && Object.keys(professions).map(option => (
//                                         <option value={option} key={professions[option]._id}>{professions[option].name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="form-label">Выберите ваш пол</label>
//                                 <div>
//                                         <div className="form-check form-check-inline">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="sex"
//                                                 checked={option.value === value}
//                                                 value={option.value}
//                                                 onChange={handleChange}
//                                             />
//                                             <label
//                                                 className="form-check-label"
//                                                 htmlFor={option.name + "_" + option.value}
//                                             >
//                                                 {option.name}
//                                             </label>
//                                         </div>
//                                 </div>
//                             </div>
//                             <button className="btn btn-primary w-100 mx-auto" type="submit">Обновить</button>
//                         </form>
//                         : <h6>Loading</h6>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// UserEditPage.propTypes = {
//     userId: PropTypes.string.isRequired
// };

// export default UserEditPage;
