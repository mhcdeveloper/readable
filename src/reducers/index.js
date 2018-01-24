import { combineReducers } from 'redux';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_ALL_COMMENTS
} from '../actions/';

const initialPostsState = {
    posts: [],
}

function postReducer  (state = initialPostsState, action) {
    switch (action.type) {
        case 'GET_ALL_POST':
            return {
                ...state,
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                ...state
            }
        
        default :
            return state;
    }
}

const initialCommentState = {
    comments: []
}

function commentReducer (state = initialCommentState, action) {
    switch (action.type) {
        case 'GET_ALL_COMMENTS' :
            return {
                ...state,
                comments: action.payload
            }
        default :
            return state;
    }
}

const initialCategoryState = {
    categories: []
}

function categoryReducer (state = initialCategoryState, action) {
    console.log(action.payload);
    switch(action.type) {
        case 'GET_ALL_CATEGORIES' :
            return {
                ...state,
                categories: action.payload
            }
        default :
            return state;
    }
}

export default combineReducers({ postReducer, commentReducer, categoryReducer });