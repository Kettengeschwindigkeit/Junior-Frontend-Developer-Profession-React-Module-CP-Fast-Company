import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PropTypes from "prop-types";
import RadioField from "../../common/form/radioField";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = ({ userId }) => {
    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentProf, setCurrentProf] = useState({});
    const [currentQualities, setCurrentQualities] = useState([]);
    const [currentSex, setCurrentSex] = useState("");

    const { currentUser } = useAuth();
    const { getProfession } = useProfessions();
    const { updateUser } = useAuth();

    const { professions } = useProfessions();
    const { qualities: qualitiesList } = useQualities();

    const professionsList = professions.map((p) => ({ label: p.name, value: p._id }));
    const transformedQualitiesList = qualitiesList.map((q) => ({ label: q.name, value: q._id }));

    const profession = getProfession(currentUser.profession);
    const history = useHistory();

    const onChangeRadio = (target) => {
        setCurrentSex(target.value);
    };

    const onChangeProf = (newValue, e) => {
        setCurrentProf(newValue);
    };

    const onChangeQualities = (newValue, e) => {
        setCurrentQualities(newValue.map(value => value));
    };

    const getQualitiess = (qualities) => {
        const userQualities = [];
        for (const quality of qualities) {
            const qualityObj = qualitiesList.find(q => q._id === quality);
            userQualities.push({ value: qualityObj._id, label: qualityObj.name });
        }
        return userQualities;
    };

    const handleGoBack = () => {
        history.push(`/users/${userId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            _id: currentUser._id,
            name: currentName,
            email: currentEmail,
            profession: currentProf.value,
            sex: currentSex,
            qualities: currentQualities.map(q => q.value)
        };
        updateUser(data);
        history.push(`/users/${userId}`);
    };

    useEffect(() => {
        setCurrentName(currentUser.name);
        setCurrentEmail(currentUser.email);
        setCurrentSex(currentUser.sex);
    }, []);

    useEffect(() => {
        if (profession) {
            setCurrentProf({ value: profession._id, label: profession.name });
        }
    }, [profession]);

    useEffect(() => {
        if (qualitiesList) {
            setCurrentQualities(getQualitiess(currentUser.qualities));
        }
    }, [qualitiesList]);

    return (
        <>
            {currentUser && currentProf && currentQualities && <div className="container mt-5">
                <button className="btn btn-primary" onClick={handleGoBack}>Назад</button>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {currentUser
                            ? <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="name">Имя</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" name="name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="email">Электронная почта</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" name="email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="profession">Выбери свою профессию</label>
                                    <Select options={professionsList} name="profession" value={currentProf} onChange={onChangeProf} />
                                </div>
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={currentSex}
                                    name="sex"
                                    onChange={onChangeRadio}
                                    label="Выберите ваш пол"
                                />
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="quality">Выберите ваши качества</label>
                                    <Select options={transformedQualitiesList} name="qualities" value={currentQualities} onChange={onChangeQualities} isMulti={true} />
                                </div>
                                <button className="btn btn-primary w-100 mx-auto" type="submit">Обновить</button>
                            </form>
                            : <h6>Loading</h6>}
                    </div>
                </div>
            </div>}
        </>

    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;
