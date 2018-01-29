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
    const { post, payload } = action;
    switch (action.type) {
        case 'GET_ALL_POST':
            return {
                ...state,
                posts: payload
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts: state.posts.concat(post)
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
    console.log(comment);
    switch (action.type) {
        case 'GET_ALL_COMMENTS' :
            return {
                ...state,
                comments: action.payload
            }
        case 'CREATE_COMMENT' :
            return {
                ...state,
                comments: state.comments.concat(comment)
            }
        case 'REMOVE_COMMENT' :
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment]: {
                        deleted: true
                    } 
                }
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