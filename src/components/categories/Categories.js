import React, { Component } from 'react';

import CategoryItem from './categoryItem';
import ModalCategory from './ModalCategory';

class Categories extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { category } = this.props;
        return (
            <div>
                <div>
                    {categories.map((category) => <CategoryItem category={category} />)}
                </div>
                <div>
                    <ModalCategory />
                </div>
            </div>
        );
    }
}

export default Categories;