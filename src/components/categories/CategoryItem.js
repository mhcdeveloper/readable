import React from 'react';

const CategoryItem = ({ category }) => {
    return (
        <div>
            <span>{category.name}</span>
            <button className="btn btn-info">Editar</button>
            <button className="btn btn-info">Remover</button>
        </div>
    );
}

export default CategoryItem;