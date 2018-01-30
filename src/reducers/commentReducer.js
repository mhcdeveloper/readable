
const initialCommentState = {
    comments: [],
    modalIsOpen: false,
    isModalRemove: false
}


function commentReducer (state = initialCommentState, action) {
    const { comment, voteScore, payload } = action;
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
            return {
                ...state,
                isModalRemove: false
            }
        case 'VOTE_SCORE' :
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

const addVote = (state, comment, voteScore) => {
    const commentIndex = state.comments.findIndex(item => item.id === comment.id)

    const newComment = {
        ...state.comments[commentIndex],
        voteScore
    }

    return {
        ...state,
        comments: [
            ...state.comments.splice(commentIndex, 1),
            newComment
        ]
    }
}
    