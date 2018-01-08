import React from 'react';

const PostItem = ({ post, metodoDeVoto }) => {
    return (
        <div>
            <span>{post.body}
                <button className="btn btn-info">Detail</button>
            </span>
            <span>{post.title}</span>
            <span>{post.category}</span>
            <span>{post.author}</span>
            <span>{post.comentCount}</span>
            <span>{post.voteScore}</span>
            <button className="btn btn-info">Votar</button>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-danger">Excluir</button>
        </div>
    );
}

export default PostItem;