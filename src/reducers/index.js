import { combineReducers } from 'redux';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_ALL_COMMENTS
} from '../actions/';

const initialPostsState = {
    posts: [],
    redirect: false
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
        case 'REMOVE_POST':
            return {
                ...state,
                redirect: action.redirect
            }
        default :
            return state;
    }
}

const initialCommentState = {
    comments: []
}

function commentReducer (state = initialCommentState, action) {
    const { comment } = action;
    switch (action.type) {
        case 'GET_ALL_COMMENTS' :
            return {
                ...state,
                comments: action.payload
            }
        case 'CREATE_COMMENT' :
            return {
                ...state,
            }
        default :
            return state;
    }
}

const initialCategoryState = {
    categories: []
}

function categoryReducer (state = initialCategoryState, action) {
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