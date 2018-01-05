import React from 'react';
import Comentarios from './comentarios/Comentarios';
import ModalComentario from './comentarios/ModalComentario';

const PostatemDetail = ({ postagem, metodoDeVoto }) => {
    return (
        <div>
            <div>
                <span>{postagem.titulo}</span>
                <span>{postagem.autor}</span>
                <span>{postagem.comentarios.length}</span>
                <span>{postagem.pontuacao}</span>
                <button className="btn btn-info">Votar</button>
                <button className="btn btn-info">Editar</button>
                <button className="btn btn-danger">Excluir</button>
                {postagem.comentarios.map((comentario) => <Comentarios comentario={comentario} />)}
            </div>
            <div>
                <ModalComentario />
            </div>
        </div>
    );
}

export default PostatemDetail;