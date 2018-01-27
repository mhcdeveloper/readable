import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { voteScorePost } from '../../actions/PostsAction';

class PostItem extends Component {
    constructor(props) {
        super(props);
    }

    //Metodo responsavel por vote score do post
    votePost = (post, option) => {
        const vote = {
            post,
            option
        }
        this.props.voteScorePost(vote);
    }

    render () {
        const { post, editPost, removePost } = this.props;
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
                        <a href="#" className="btn btn-primary" onClick={() => this.votePost(post, 1)}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                        <a href="#" className="btn btn-primary" onClick={() => this.votePost(post, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></a>
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
}

const mapDispatchToProps = dispatch => ({
    voteScorePost: (vote) => dispatch(voteScorePost(vote))
})

export default connect(null, mapDispatchToProps)(PostItem);