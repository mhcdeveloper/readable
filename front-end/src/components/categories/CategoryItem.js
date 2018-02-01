import React from 'react';

const CategoryItem = ({ category }) => {
    return (
        <div>
            <span>{category.name}</span>
        </div>
    );
}

export default CategoryItem;