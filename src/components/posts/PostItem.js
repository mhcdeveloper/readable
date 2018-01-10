import React from 'react';

const PostItem = ({ post, metodoDeVoto, upVote, downVote }) => {
    return (
        <div>
            <div className="card">
                <div class="card-block">
                    <h3 class="card-title">{post.title}</h3>
                    <p class="card-text">{post.author}</p>
                    <p className="card-text">
                        <small className="text-muted">{post.commentCount} <i className="glyphicon glyphicon-comment"></i> </small>
                        <small className="text-muted">{post.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                    </p>
                    <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-thumbs-up" onClick={upVote}></i></a>
                    <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-thumbs-down" onClick={downVote}></i></a>
                    <div className="btn-card-post">
                        <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-eye-open"></i></a>
                        <a href="#" className="btn btn-info"><i className="glyphicon glyphicon-edit"></i></a>
                        <a href="#" className="btn btn-danger"><i className="glyphicon glyphicon-trash"></i></a>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

export default PostItem;