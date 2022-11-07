import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import { orderBy } from "lodash";
import { displayDate } from "../../../utils/displayDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { CommentsProvider } from "../../../hooks/useComments";

const CommentCard = ({ id, userId, createdAt, content, handleDelete }) => {
    const [user, setUser] = useState();

    const date = displayDate(createdAt);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">{user?.name}<span className="small">&nbsp;{date}</span></p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center" onClick={() => handleDelete(id)}>
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [users] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectValue, setSelectValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    const { currentUser } = useAuth();
    const { getUserById } = useUser();
    const user = getUserById(userId);

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, [selectValue]);

    const handleAddComment = () => {
        const data = {
            userId: selectValue,
            pageId: userId,
            content: textareaValue
        };
        api.comments.add(data).then((data) => setComments([...comments, data]));
        setTextareaValue("");
    };

    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };

    const handleSelectChange = (e) => {
        console.log(e.target);
        setSelectValue(e.target.value);
    };

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
    };

    const onDelete = (id) => {
        setComments(comments.filter(comment => comment._id !== id));
        api.comments.remove(id);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                {currentUser._id === user._id && <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={handleClick}>
                                    <i className="bi bi-gear"></i>
                                </button>}
                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={user.image}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">{user.profession.name}</p>
                                        <div className="text-muted">
                                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                                            <span className="ms-2">{user.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <Qualities qualities={user.qualities} />
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>
                                <h1 className="display-1">{user.completedMeetings}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <div className="card mb-2">
                                {" "}
                                <div className="card-body">
                                    <h2>New comment</h2>
                                    <div className="mb-4">
                                        <select className="form-select" name="userId" value={selectValue} onChange={handleSelectChange}>
                                            <option value="" disabled>Выберите пользователя</option>
                                            {users && users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Сообщение</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" style={{ minHeight: "100px" }} value={textareaValue} onChange={handleTextareaChange}></textarea>
                                    </div>
                                    <button className="btn btn-primary float-end" onClick={handleAddComment}>Опубликовать</button>
                                </div>
                            </div>
                            {sortedComments.length > 0 && <div className="card mb-3">
                                <div className="card-body">
                                    <h2>Comments</h2>
                                    <hr />
                                    {sortedComments.map(comment => {
                                        return (
                                            <CommentCard
                                                key={comment._id}
                                                id={comment._id}
                                                userId={comment.userId}
                                                createdAt={comment.created_at}
                                                content={comment.content}
                                                handleDelete={onDelete}
                                            />
                                        );
                                    })}
                                </div>
                            </div>}
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

CommentCard.propTypes = {
    id: PropTypes.string,
    userId: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    handleDelete: PropTypes.func
};

export default UserPage;
