import React from 'react';

const Comments = ({ comment }) => {
    return (
        <div>
            <span>{comment.autor}</span>
            <span>{comment.pontuacao}</span>
            <button className="btn btn-info">Votar</button>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-info">Excluir</button>
        </div>
    );
}

export default Comments;