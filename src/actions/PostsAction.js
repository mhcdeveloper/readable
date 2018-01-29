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

//Responsavel por buscar os posts da api
export const fetchPosts = () => dispatch => {
    ReadableAPI.getAllPosts()
           .then(res => dispatch(getAll(res)));
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

//Responsavel por fazer o vote score do post
export const voteScorePost = (vote) => dispatch => {
    ReadableAPI.voteScorePost(vote)
        .then(res => {
            return {
                type: 'VOTE_SCORE_POST',
                payload: res
            }
        })
        .catch(err => console.log(err));
}

//Responsavel por setar o post no redux
export const removePostRedux = () => {
    return  {
        type: 'REMOVE_POST',
        redirect: true
    }
}

//Responsavel por remover o post
export const removePost = (id) => dispatch => {
    ReadableAPI.removePost(id)
        .then(res => dispatch(removePostRedux()))
        .catch(err => console.log(err));
}

//Responsavel por atualizar o post
export const updatePost = (post) => dispatch => {
    ReadableAPI.updatePost(post)
        .then(res => {
            return {
                type: 'CREATE_POST',
                payload: post
            }            
        })
        .catch(err => console.log(err));
}