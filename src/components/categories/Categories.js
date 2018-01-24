import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import CategoryItem from './CategoryItem';
import ModalCategory from './ModalCategory';
import { getAllCategories } from '../../actions/CategoryAction';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {
                name: '',
                path: ''
            },
            modalIsOpen: false
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        ReadableAPI.getAllCategories()
           .then(res => this.props.getAll(res));
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            category: {
                [e.target.name]: e.target.value
            }
        })
    }

    render () {
        const { category, modalIsOpen } = this.state;
        const { categories } = this.props;
        return (
            <div>
                <div>
                    {categories.map(category => <CategoryItem key={category.name} category={category} />)}
                </div>
                <div>
                    <ModalCategory 
                        isOpen={modalIsOpen}
                        category={category}
                        handleChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ categoryReducer }) => ({
    categories: categoryReducer.categories
})

const mapDispatchToProps = dispatch => ({
    getAll: (categories) => dispatch(getAllCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);