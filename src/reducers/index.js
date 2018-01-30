import { combineReducers } from 'redux';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_ALL_COMMENTS
} from '../actions/';
import { voteScorePost } from '../actions/PostsAction';
import { removeObjectInArrayById } from '../shared/utils/array';

const initialPostsState = {
    posts: [],
    redirect: false,
    modalIsOpen: false,
    isModalRemove: false
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
            return removePost(state, post.id)
        case 'VOTE_SCORE_POST':
            return addVotePost(state, post, post.voteScore)
        case 'OPEN_MODAL_REMOVE' :
            return {
                ...state,
                isModalRemove: true
            }
        default :
            return state;
    }
}

//Metodo responsavel por remover o Post do array
const removePost = (state, postId) => {
    return { 
        ...state,
        posts: removeObjectInArrayById(state.posts, postId)
    }
}

//Metodo responsavel pelo voteScore do post
const addVotePost = (state, post, voteScore) => {
    const index = state.posts.findIndex(item => item.id === post.id)

    const newPost = {
        ...state.posts[index],
        voteScore
    }

	return {
        ...state,
        posts: [
            ...state.posts.slice(0,  index),
            newPost,
            ...state.posts.slice(index + 1, state.posts.length)
        ]
    }
}


















const initialCommentState = {
    comments: [],
    modalIsOpen: false,
    isModalRemove: false
}


function commentReducer (state = initialCommentState, action) {
    const { comment, voteScore, payload, commentId, postId } = action;
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
            return removeComment(state, commentId)
        case 'VOTE_SCORE_COMMENT' :
            return addVote(state, comment, voteScore)
            
        case 'OPEN_MODAL_REMOVE' :
            return {
                    ...state,
                    isModalRemove: true
            }
        default :
            return state;
    }
}

//Metodo responsavel por remover o Post do array
const removeComment = (state, commentId) => {
    return { 
        ...state,
        comments: removeObjectInArrayById(state.posts, commentId)
    }
}

//Metodo responsavel pelo voteScore do post
const addVote = (state, comment, voteScore) => {
    const index = state.comments.findIndex(item => item.id === comment.id)

    const newComment = {
        ...state.comments[index],
        voteScore
    }

	return {
        ...state,
        comments: [
            ...state.comments.slice(0,  index),
            newComment,
            ...state.comments.slice(index + 1, state.comments.length)
        ]
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