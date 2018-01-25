import * as ReadableAPI from '../shared/utils/ReadableAPI';
import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from './index';

export const getAll = (posts) => {  
    return {
        type: 'GET_ALL_POST',
        payload: posts
    }
}

export function createPost (post) {
    console.log(post);
    return {
        type: 'CREATE_POST',
        payload: post
    }
}

export function votePost (id, option) {
    ReadableAPI.voteScorePost(id, option)
        .then(res => null)
        .catch(err => console.log(err));
}