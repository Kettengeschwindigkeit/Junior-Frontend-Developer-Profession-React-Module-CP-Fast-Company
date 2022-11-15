import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";
import { getComments, getCommentsLoadingStatus, loadCommentsList } from "../../store/comments";

const Comments = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const { userId } = useParams();
    const { createComment, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        /> : "loading..."}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
