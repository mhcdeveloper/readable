import React from 'react';
import { Link } from 'react-router-dom';

const upVote = () => {
    console.log('up')
}

const downVote = () => {
    console.log('down')
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
                    <a href="#" className="btn btn-primary" onClick={() => upVote()}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                    <a href="#" className="btn btn-primary" onClick={() => downVote()}><i className="glyphicon glyphicon-thumbs-down"></i></a>
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

export default PostItem;