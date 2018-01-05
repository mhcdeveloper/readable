import React, { Component } from 'react';

import PostagemItem from './PostagemItem';

class Postagens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postagens: [
                {

                }
            ]
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
            </div>
        );
    }
}

export default Postagens;