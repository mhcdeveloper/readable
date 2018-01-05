import React from 'react';

const Comentarios = ({ comentario }) => {
    return (
        <div>
            <span>{comentario.autor}</span>
            <span>{comentario.pontuacao}</span>
            <button className="btn btn-info">Votar</button>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-info">Excluir</button>
        </div>
    );
}

export default Comentarios;