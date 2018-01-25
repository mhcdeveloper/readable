import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ReadableAPI from '../../../shared/utils/ReadableAPI';
import { voteScoreComment } from '../../../actions/CommentsAction';

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    voteComment = (comment, option) => {
        this.props.voteScoreComment(comment.id, option);
    }

    render () {
        const { comment, editComment, removeComment } = this.props;
        return (
            <div className="card">
                <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                    <p className="card-text">{comment.author}</p>
                    <p className="card-text">
                        <small className="text-muted" onClick={() => this.voteComment(comment, 1)}>{comment.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                        <small className="text-muted" onClick={() => this.voteComment(comment, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></small>
                    </p>
                </div>
                <div className="card-block">
                    <a href="#" className="card-link" onClick={() => editComment(comment)}><i className="glyphicon glyphicon-edit"></i></a>
                    <a href="#" className="card-link" onClick={() => removeComment(comment)}><i className="glyphicon glyphicon-trash"></i></a>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    voteScoreComment: (id, option) => dispatch(voteScoreComment(id, option))
})

export default connect(null, mapDispatchToProps)(Comments);