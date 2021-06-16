import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import CommentList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }
  if (status === 'completed' && !loadedComments && loadedComments < 0) {
    comments = <p className="centered">No comments were added yet</p>;
  }
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddComment={addedCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
