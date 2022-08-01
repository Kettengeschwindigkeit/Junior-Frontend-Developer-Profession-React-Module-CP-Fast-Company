import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "../components/searchStatus";
import UsersTable from "./usersTable";

const Users = ({ users: allUsers, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProffessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf ? allUsers.filter(user => user.profession.name === selectedProf.name) : allUsers;
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProffessionSelect}
                        valueProperty="_id"
                        contentProperty="name"
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Clear</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus users={filteredUsers} />
                {count > 0 && <UsersTable users={usersCrop} onDelete={onDelete} />}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

        </div>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
