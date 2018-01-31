import * as ReadableAPI from '../shared/utils/ReadableAPI';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from './index';

//Responsavel por setar no redux todos os posts
export const getAll = (posts) => {  
    return {
        type: 'GET_ALL_POST',
        payload: posts
    }
}

//Responsavel por buscar os posts da api por categoria ou sem
export const fetchPostsByCategory = (category) => dispatch => {
    if(category) {
        ReadableAPI.getPostsByCategory(category)
            .then(res => dispatch(getAll(res)))
    } else {
        ReadableAPI.getAllPosts()
            .then(res => dispatch(getAll(res)));    
    }
}

//Responsavel por setar o novo post no redux
export const createPostRedux = (post) => {
    return {
        type: 'CREATE_POST',
        post
    }
}

//Responsavel por criar o post
export const createPost = (post) => dispatch => {
    ReadableAPI.createPost(post)
        .then(res => dispatch(createPostRedux(res)))
        .catch(err => console.log(err));
}

//Responsavel por setar o voteScore
export const voteScorePostRedux = (post) => {
    return {
        type: 'VOTE_SCORE_POST',
        post,
        voteScore: post.voteScore
    }
}

//Responsavel por fazer o vote score do post
export const voteScorePost = (vote) => dispatch => {
    ReadableAPI.voteScorePost(vote)
        .then(res => dispatch(voteScorePostRedux(res)))
        .catch(err => console.log(err));
}

//Responsavel por setar o post no redux
export const removePostRedux = (res) => {
    return  {
        type: 'REMOVE_POST',
        redirect: true,
        post: res
    }
}

//Responsavel por remover o post
export const removePost = (id) => dispatch => {
    console.log('entrou')
    ReadableAPI.removePost(id)
        .then(res => dispatch(removePostRedux(res)))
        .catch(err => console.log(err));
}

//Responsavel por setar a atualização do post no redux
export const updatePostRedux = (post) => {
    return {
        type: 'UPDATE_POST',
        post
    }            
}

//Responsavel por atualizar o post
export const updatePost = (post) => dispatch => {
    ReadableAPI.updatePost(post)
        .then(res => dispatch(updatePostRedux(res)))
        .catch(err => console.log(err));
}

//Responsavel por abrir o modal de remove
export const openModalRemovePostRedux = () => {
    return {
        type: 'OPEN_MODAL_REMOVE',
        payload: true
    }
}

//Responsavel por abrir o modal do post
export const openModalPostRedux = () => {
    return {
        type: 'OPEN_MODAL_POST'
    }
}