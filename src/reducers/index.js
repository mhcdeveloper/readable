import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from '../actions/';

const initialPostsState = {
    posts: [],
    open: false
}

function postReducer  (state = initialPostsState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'GET_ALL_POST':
            return {
                ...state,
                posts: payload,
                open: true
            }
        case 'CREATE_POST':
            return {
                ...state,
                payload
            }
        
        default :
            return state;
    }
}

export default postReducer;