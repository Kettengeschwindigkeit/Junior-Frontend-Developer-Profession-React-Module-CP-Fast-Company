import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PropTypes from "prop-types";
import api from "../../../api";
import RadioField from "../../common/form/radioField";

const UserEditPage = ({ userId }) => {
    const [data, setData] = useState({ name: "", email: "", profession: "", sex: "male", qualities: [] });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentProf, setCurrentProf] = useState("");
    const [currentQualities, setCurrentQualities] = useState([]);

    const history = useHistory();

    const onChange = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onChangeRadio = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const onChangeProf = (newValue, e) => {
        setCurrentProf(newValue.value);
        setData(prevState => ({
            ...prevState,
            [e.name]: {
                _id: newValue.value,
                name: newValue.label
            }
        }));
    };

    const onChangeQualities = (newValue, e) => {
        setCurrentQualities(newValue.map(value => value.value));
        setData(prevState => ({
            ...prevState,
            [e.name]: newValue.map(value => {
                return { _id: value.value, name: value.label, color: value.color };
            })
        }));
    };

    const getProf = (objProf) => {
        return { value: objProf._id, label: objProf.name };
    };

    const getProfValue = () => {
        return currentProf ? professions.find(prof => prof.value === currentProf) : "";
    };

    const getQualities = (qualities) => {
        const qualitiesArray = [];
        for (const quality of qualities) {
            qualitiesArray.push({ value: quality._id, label: quality.name });
        }
        return qualitiesArray;
    };

    const getQualitiesValues = () => {
        return currentQualities ? qualities.filter(quality => currentQualities.indexOf(quality.value) >= 0) : [];
    };

    const handleGoBack = () => {
        history.push(`/users/${userId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, data);
        history.push(`/users/${userId}`);
    };

    useEffect(() => {
        setCurrentName(data.name);
        setCurrentEmail(data.email);
        setCurrentProf(getProf(data.profession).value);
        setCurrentQualities(data.qualities ? getQualities(data.qualities).map(item => item.value) : []);
    }, [data]);

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
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

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary" onClick={handleGoBack}>Назад</button>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {data
                            ? <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="name">Имя</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" name="name" value={currentName} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="email">Электронная почта</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" name="email" value={currentEmail} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="profession">Выбери свою профессию</label>
                                    <Select options={professions} name="profession" value={getProfValue()} onChange={onChangeProf} />
                                </div>
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={onChangeRadio}
                                    label="Выберите ваш пол"
                                />
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="quality">Выберите ваши качества</label>
                                    <Select options={qualities} name="qualities" value={getQualitiesValues()} onChange={onChangeQualities} isMulti={true} />
                                </div>
                                <button className="btn btn-primary w-100 mx-auto" type="submit">Обновить</button>
                            </form>
                            : <h6>Loading</h6>}
                    </div>
                </div>
            </div>
        </>

    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditPage;
