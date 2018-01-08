import React from 'react';
import Comments from './comments/Comments';
import ModalComentario from './comments/ModalComentario';

const PostDetail = ({ post, metodoDeVoto }) => {
    return (
        <div>
            <div>
                <span>{post.titulo}</span>
                <span>{post.autor}</span>
                <span>{post.comments.length}</span>
                <span>{post.pontuacao}</span>
                <button className="btn btn-info">Votar</button>
                <button className="btn btn-info">Editar</button>
                <button className="btn btn-danger">Excluir</button>
                {post.comments.map((comment) => <Comments comment={comment} />)}
            </div>
            <div>
                <ModalComment />
            </div>
        </div>
    );
}

export default PostDetail;