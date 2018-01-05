import react from 'react';

const CategoriaItem = ({ categoria }) => {
    return (
        <div>
            <span>{categoria.descricao}</span>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-info">Remover</button>
        </div>
    );
}