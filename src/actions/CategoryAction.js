
export const getAllCategories = (categories) => {  
    //console.log(categories.categories);
    return {
        type: 'GET_ALL_CATEGORIES',
        payload: categories.categories
    }
}
