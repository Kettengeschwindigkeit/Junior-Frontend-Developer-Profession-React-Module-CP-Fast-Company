import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import UserPage from "../userPage/userPage";
import _ from "lodash";

const UsersListPage = () => {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [inputValue, setInputValue] = useState("");
    const { userId } = useParams();
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then(response => setUsers(response));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const clearFilter = () => {
        setSelectedProf();
        console.log(users.length);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProffessionSelect = item => {
        setInputValue("");
        setSelectedProf(item);
    };

    const handleSearchByName = (e) => {
        clearFilter();
        setInputValue(e.target.value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => user.profession._id === selectedProf._id)
            : inputValue
                ? users.filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase().trim()))
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {userId
                    ? <UserPage users={users} id={userId} />
                    : <>
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
                            <input type="text" placeholder="Search..." onChange={handleSearchByName} value={inputValue} />
                            <ul>
                            </ul>
                            {count > 0 && <UsersTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
    return "Loading...";
};

export default UsersListPage;
