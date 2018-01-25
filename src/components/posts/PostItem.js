import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { votePost } from '../../actions/PostsAction';

const votePostScore = () => {
    
}

const PostItem = ({ post, metodoDeVoto, editPost, removePost }) => {
    return (
        <div>
            <div className="card">
                <div className="card-block">
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-text">{post.author}</p>
                    <p className="card-text">
                        <small className="text-muted">{post.commentCount} <i className="glyphicon glyphicon-comment"></i> </small>
                        <small className="text-muted">{post.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                    </p>
                    <a href="#" className="btn btn-primary" onClick={() => votePostScore(post.id, 0)}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                    <a href="#" className="btn btn-primary" onClick={() => votePostScore(post.id, 1)}><i className="glyphicon glyphicon-thumbs-down"></i></a>
                    <div className="btn-card-post">
                        <Link to={`/posts/detail/${post.id}`} className="btn btn-primary"><i className="glyphicon glyphicon-eye-open"></i></Link>
                        <a href="#" className="btn btn-info" onClick={() => editPost(post)}><i className="glyphicon glyphicon-edit"></i></a>
                        <a href="#" className="btn btn-danger" onClick={() => removePost(post)}><i className="glyphicon glyphicon-trash"></i></a>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    voteScorePost: (id, option) => dispatch(votePost(id, option))
})

export default connect(null, mapDispatchToProps)(PostItem);