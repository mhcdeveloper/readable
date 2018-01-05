import React, { Component } from 'react';

import PostagemItem from './PostagemItem';
import ModalPostagem from './ModalPostagem';

class Postagens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postagens: [
                {
                    titulo: '',
                    corpo: '',
                    autor: '',
                    numeroComentario: '',
                    pontuacao: '',
                    comentarios: [
                        {
                            comentario: '',
                            autor: '',
                            pontuacao: ''
                        }
                    ]
                }
            ],
        }
    }
    render () {
        const { postagens } = this.state;
        return (
            <div>
                <div>
                    {postagens.map((postagem) => {
                        return (
                            <PostagemItem postagens={postagens} />
                        );
                    })}
                </div>
                <div>
                    <ModalPostagem />
                </div>
            </div>
        );
    }
}

export default Postagens;