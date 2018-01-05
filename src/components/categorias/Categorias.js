import React, { Component } from 'react';

import CategoriaItem from './categoriaItem';
import ModalCategoria from './ModalCategoria';

class Categorias extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { categoria } = this.props;
        return (
            <div>
                <div>
                    {categorias.map((categoria) => <CategoriaItem />)}
                </div>
                <div>
                    <ModalCategoria />
                </div>
            </div>
        );
    }
}

export default Categorias;