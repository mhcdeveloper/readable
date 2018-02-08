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
            option,
            typePost: 'postItem'
        }
        this.props.voteScorePost(vote);
    }

    render () {
        const { post, editPost, removePost, category } = this.props;
        
        return (
            <div>
                <div className="card">
                    <div className="card-block">
                        <div className="btn btn-success">
                            <span>{post.category}</span>
                        </div>
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-text">{post.author}</p>
                        <p className="card-text">
                            <small className="text-muted">{post.commentCount} <i className="glyphicon glyphicon-comment"></i> </small>
                            <small className="text-muted">{post.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                        </p>
                        <button href="#" className="btn btn-primary" onClick={() => this.votePost(post, 1)}><i className="glyphicon glyphicon-thumbs-up"></i></button>
                        <button href="#" className="btn btn-primary" onClick={() => this.votePost(post, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></button>
                        <div className="btn-card-post">
                            <Link to={`/${category === undefined ? 'allPosts' : category}/${post.id}`} className="btn btn-primary"><i className="glyphicon glyphicon-eye-open"></i></Link>
                            <button href="#" className="btn btn-info" onClick={() => editPost(post)}><i className="glyphicon glyphicon-edit"></i></button>
                            <button href="#" className="btn btn-danger" onClick={() => removePost(post)}><i className="glyphicon glyphicon-trash"></i></button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

const mapStateToProps = ({ postReducer }) => ({
    category: postReducer.category
})

const mapDispatchToProps = dispatch => ({
    voteScorePost: (vote) => dispatch(voteScorePost(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);