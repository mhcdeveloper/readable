import React from 'react';
import { connect } from 'react-redux';

import * as ReadableAPI from '../../../shared/utils/ReadableAPI';
import { voteScoreComment } from '../../../actions/CommentsAction';

const upVote = (comment) => {
    console.log('up')
    let option = 'upVote';
    ReadableAPI.voteScoreComment(comment.id, option)
        .then(res => null)
        .catch(err => console.log(err));
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
                    <small className="text-muted" onClick={() => upVote(comment)}>{comment.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                    <small className="text-muted" onClick={() => downVote(comment)}><i className="glyphicon glyphicon-thumbs-down"></i></small>
                </p>
            </div>
            <div className="card-block">
                <a href="#" className="card-link" onClick={() => editComment(comment)}><i className="glyphicon glyphicon-edit"></i></a>
                <a href="#" className="card-link" onClick={() => removeComment(comment)}><i className="glyphicon glyphicon-trash"></i></a>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    voteScoreComment: (comment) => dispatch(voteScoreComment(comment))
})

export default connect(null, mapDispatchToProps)(Comments);