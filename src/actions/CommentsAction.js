import * as ReadableAPI from '../shared/utils/ReadableAPI';
import { GET_ALL_COMMENTS } from './index';

export const getAllComments = (comments) => {  
    console.log(comments);
    return {
        type: 'GET_ALL_COMMENTS',
        payload: comments
    }
}

export function voteScoreComment(id, option) {
    ReadableAPI.voteScoreComment(id, option)
        .then(res => {
            return {
                type: 'VOTE_SCORE_COMMENT',
                payload: option
            }
        })
        .catch(err => console.log(err));
}