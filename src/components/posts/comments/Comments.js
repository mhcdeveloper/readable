import React from 'react';

const upVote = () => {
    console.log('up')
}


const downVote = () => {
    console.log('down')
}

const Comments = ({ comment, editComment, removeComment }) => {
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
                <p className="card-text">{comment.author}</p>
                <p className="card-text">
                    <small className="text-muted" onClick={() => upVote()}>{comment.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                    <small className="text-muted" onClick={() => downVote()}><i className="glyphicon glyphicon-thumbs-down"></i></small>
                </p>
            </div>
            <div className="card-block">
                <a href="#" className="card-link" onClick={() => editComment(comment)}><i className="glyphicon glyphicon-edit"></i></a>
                <a href="#" className="card-link" onClick={() => removeComment(comment)}><i className="glyphicon glyphicon-trash"></i></a>
            </div>
        </div>
    );
}

export default Comments;