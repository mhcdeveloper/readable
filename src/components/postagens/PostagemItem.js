import React from 'react';

const PostagemItem = ({ postagem, metodoDeVoto }) => {
    return (
        <div>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-danger">Excluir</button>
        </div>
    );
}