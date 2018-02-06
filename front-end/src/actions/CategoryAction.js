import * as ReadableAPI from '../shared/utils/ReadableAPI';

//Responsavel por setar na store as cetegories
export const getAllCategories = (categories) => {  
    return {
        type: 'GET_ALL_CATEGORIES',
        categories: categories.categories
    }
}

//Responsavel por buscar todas as categories
export const fetchCategories = () => dispatch => {
    ReadableAPI.getAllCategories()
        .then(res => dispatch(getAllCategories(res)));
}

export const setCategory= (category) => {
    return {
        type: 'SET_CATEGORY',
        category
    }
}