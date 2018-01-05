import React from 'react';
import Comentarios from './Comentarios';

const PostagemItem = ({ postagem, metodoDeVoto }) => {
    return (
        <div>
            <span>{postagem.corpo}
                <button className="btn btn-info">Detail</button>
            </span>
            <span>{postagem.titulo}</span>
            <span>{postagem.autor}</span>
            <span>{postagem.comentarios.length}</span>
            <span>{postagem.pontuacao}</span>
            <button className="btn btn-info">Votar</button>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-danger">Excluir</button>
        </div>
    );
}

export default PostagemItem;