import React from 'react';

const Comments = ({ comment, editComment }) => {
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
                <p className="card-text">{comment.author}</p>
                <p className="card-text">
                    <small className="text-muted">{comment.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                </p>
            </div>
            <div className="card-block">
                <a href="#" className="card-link" onClick={() => editComment(comment)}><i className="glyphicon glyphicon-edit"></i></a>
                <a href="#" className="card-link"><i className="glyphicon glyphicon-trash"></i></a>
            </div>
        </div>
    );
}

export default Comments;