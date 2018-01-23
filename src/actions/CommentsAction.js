import { GET_ALL_COMMENTS } from './index';

export const getAllComments = (comments) => {  
    console.log(comments);
    return {
        type: 'GET_ALL_COMMENTS',
        payload: comments
    }
}

export const voteScoreComment = (comment) => {
    return {
        type: 'VOTE_SCORE_COMMENT',
        payload: comment
    }
}