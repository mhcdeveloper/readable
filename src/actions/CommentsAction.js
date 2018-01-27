import * as ReadableAPI from '../shared/utils/ReadableAPI';
import { GET_ALL_COMMENTS } from './index';

//Responsável por setar no redux os comments
export const getAllComments = (comments) => {  
    console.log(comments);
    return {
        type: 'GET_ALL_COMMENTS',
        payload: comments
    }
}

//Responsavel por buscar todos os comments do post especifico
export const fetchComments = (id) => dispatch => {
    ReadableAPI.getCommentPost(id)
        .then((comments) => dispatch(getAllComments(comments)));
}

//Responsavel por fazer o vote score do comment
export const voteScoreComment = (vote) => dispatch => {
    ReadableAPI.voteScoreComment(vote)
        .then(res => {
            return {
                type: 'VOTE_SCORE_COMMENT',
                payload: res
            }
        })
        .catch(err => console.log(err));
}

//Metodo responsavel por criar o comment
export const createComment = (comment, parentId) => dispatch => {
    ReadableAPI.createComment(comment, parentId)
                .then(res => {
                    return {
                        type: 'CREATE_COMMENT',
                        payload: res
                    }
                })
                .catch(err => console.log(err));
}

//Responsavel por remover o comment
export const removeComment = (id) => dispatch => {
    ReadableAPI.removeComment(id)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}