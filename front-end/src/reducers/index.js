import { combineReducers } from 'redux';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_ALL_COMMENTS
} from '../actions/';
import { voteScorePost } from '../actions/PostsAction';
import { removeObjectInArrayById, updateObjectInArrayById } from '../shared/utils/array';



/*INICIO REDUCER DE POSTS */


const initialPostsState = {
    posts: [],
    redirect: false,
    modalIsOpen: false,
    isModalRemove: false,
    loading: true,
    pageNotFound: false,
    category: ''
}

function postReducer  (state = initialPostsState, action) {
    const { post, payload, postDetail, pageNotFound, category } = action;
    switch (action.type) {
        case 'GET_ALL_POST':
            return {
                ...state,
                posts: payload,
                loading: false,
                category 
            }
            
        case 'CREATE_POST':
            return {
                ...state,
                posts: state.posts.concat(post),
                modalIsOpen: !state.modalIsOpen
            }
    
        case 'UPDATE_POST' :
            return updatePost(state, post)

        case 'OPEN_MODAL_POST':
            return {
                ...state,
                modalIsOpen: !state.modalIsOpen
            }
        
        case 'REMOVE_POST':
            return removePost(state, post.id)
        
        case 'VOTE_SCORE_POST':
            return addVotePost(state, post, post.voteScore)
        
        case 'OPEN_MODAL_REMOVE' :
            return {
                ...state,
                isModalRemove: !state.isModalRemove
            }
        
        case 'POST_NOT_FOUND' :
            return {
                ...state,
                pageNotFound: true
            }

        case 'SET_CATEGORY' :
            return {
                ...state,
                category
            }
        
        default :
            return state;
    }
}

//Metodo responsavel por atualizar o post da lista
const updatePost = (state, post) => {
    return {
        ...state,
        posts: updateObjectInArrayById(state.posts, post),
        modalIsOpen: !state.modalIsOpen
    }
}

//Metodo responsavel por remover o Post do array
const removePost = (state, postId) => {
    return { 
        ...state,
        posts: removeObjectInArrayById(state.posts, postId),
        redirect: !state.redirect
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

/*FIM REDUCER DE POSTS */

/*INICIO REDUCER DE COMMENTS */


const initialCommentState = {
    comments: [],
    modalIsOpen: false,
    isModalRemove: false,
    modalIsOpenComment: false
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
                comments: state.comments.concat(comment),
                modalIsOpenComment: !state.modalIsOpenComment
            }
        
        case 'UPDATE_COMMENT' :
            return updateComment(state, comment)

        case 'REMOVE_COMMENT' :
            return removeComment(state, commentId)
        
        case 'VOTE_SCORE_COMMENT' :
            return addVote(state, comment, voteScore)
        
        case 'OPEN_MODAL_COMMENT':
            return {
                ...state,
                modalIsOpenComment: !state.modalIsOpenComment
            }
        
        case 'OPEN_MODAL_REMOVE' :
            return {
                    ...state,
                    isModalRemove: true
            }
        
        default :
            return state;
    }
}


//Metodo responsavel por atualizar o comment da lista
const updateComment = (state, comment) => {
    return {
        ...state,
        comments: updateObjectInArrayById(state.comments, comment),
        modalIsOpenComment: !state.modalIsOpenComment,
        isModalRemove: !state.isModalRemove
    }
}

//Metodo responsavel por remover o Post do array
const removeComment = (state, commentId) => {
    //Caso esteja limpando todos os comentarios terei que colocar a função direto pq esta perdendo a referença do metodo
    //removeObjectInArrayById
    //state.comments.filter(item => item.id !== commentId)
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

/*FIM REDUCER DE COMMENTS */

/*INICIO REDUCER DE CATEGORIES */

const initialCategoryState = {
    categories: [],
}

function categoryReducer (state = initialCategoryState, action) {
    const { categories, category } = action;
    switch(action.type) {
        case 'GET_ALL_CATEGORIES' :
            return {
                ...state,
                categories
            }

        default :
            return state;
    }
}


/*FIM REDUCER DE CATEGORIES */

export default combineReducers({ postReducer, commentReducer, categoryReducer });