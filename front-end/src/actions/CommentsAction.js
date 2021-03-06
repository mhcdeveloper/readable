import * as ReadableAPI from '../shared/utils/ReadableAPI';
import { GET_ALL_COMMENTS } from './index';

//Responsável por setar no redux os comments
export const getAllComments = (comments) => {  
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

//Responsavel por setar o comment que será editado na store do redux
export const fetchCommentToEdit = (commentEdit) => {
    return {
        type: 'SET_COMMENT_EDIT',
        commentEdit
    }
}

//Responsavel por setar o novo scorte no redux
export const voteScoreCommentRedux = (comment) => {
    return {
        type: 'VOTE_SCORE_COMMENT',
        comment,
        voteScore: comment.voteScore
    }
}

//Responsavel por fazer o vote score do comment
export const voteScoreComment = (vote) => dispatch => {
    ReadableAPI.voteScoreComment(vote)
        .then(res => dispatch(voteScoreCommentRedux(res)))
        .catch(err => console.log(err));
}

//Metodo responsavel por setar no redux o novo comentario
export const createCommentRedux = (comment) => {
    return {
        type: 'CREATE_COMMENT',
        comment
    }
}

//Metodo responsavel por criar o comment
export const createComment = (comment, parentId) => dispatch => {
    ReadableAPI.createComment(comment, parentId)
                .then(res => dispatch(createCommentRedux(res)))
                .catch(err => console.log(err));
}

//Metodo responsavel por remover o comment do redux
export const removeCommentRedux = (comment) => {
    return {
        type: 'REMOVE_COMMENT',
        commentId: comment.id
    }
}

//Responsavel por remover o comment
export const removeComment = (id) => dispatch => {
    ReadableAPI.removeComment(id)
        .then(res => dispatch(removeCommentRedux(res)))
        .catch(err => console.log(err));
}


//Responsavel por setar a atualização do comment no redux
export const updateCommentRedux = (comment) => {
    return {
        type: 'UPDATE_COMMENT',
        comment
    }            
}

//Responsavel por atualizar o comment
export const updateComment = (comment) => dispatch => {
    ReadableAPI.updateComment(comment)
        .then(res => dispatch(updateCommentRedux(res)))
        .catch(err => console.log(err));
}

//Responsavel por abrir o modal de remove
export const openModalRemoveCommentRedux = () => {
    return {
        type: 'OPEN_MODAL_REMOVE',
        payload: true
    }
}

//Responsavel por abrir o modal do post
export const openModalCommentRedux = () => {
    return {
        type: 'OPEN_MODAL_COMMENT'
    }
}

//Responsavel por abrir o modal mas para inserir um novo comment
export const openModalToNewComment = () => {
    return {
        type: 'OPEN_MODAL_TO_NEW_COMMENT'
    }
}