import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from './index';

import * as ReadableAPI from '../shared/utils/ReadableAPI';



export function getAll (posts) {    
    return {
        type: 'GET_ALL_POST',
        payload: posts
    }
}

export function createPost (post) {
    return {
        type: 'CREATE_POST',
        payload: post
    }
}