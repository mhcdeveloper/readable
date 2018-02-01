import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ReadableAPI from '../../../shared/utils/ReadableAPI';
import { voteScoreComment, removeComment, openModalRemoveCommentRedux } from '../../../actions/CommentsAction';
import ModalRemove from '../../../shared/ModalRemove';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: {},
            isModalRemove: false
        }
    }

    //Metodo responsavel por abrir o modalRemove
    openModalRemove = (comment) => {
        this.setState({
            comment,
            isModalRemove: true
        });
        this.props.openModalRemoveCommentRedux();
    }

    //Responsavel por fechar o modalRemove
    closeModalRemove = () => {
        this.setState({
            modalIsOpen: false,
            isModalRemove: false
        });
    }

    //Responsavel pelo vote score do comment
    voteComment = (comment, option) => {
        const vote = {
            comment,
            option
        }
        this.props.voteScoreComment(vote);
    }

    render () {
        const { comment, editComment, removeComment } = this.props;
        return (
            <div className="card">
                <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                    <p className="card-text">{comment.author}</p>
                    <p className="card-text">
                        <small className="text-muted" onClick={() => this.voteComment(comment, 1)}>{comment.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                        <small className="text-muted" onClick={() => this.voteComment(comment, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></small>
                    </p>
                </div>
                <div className="card-block">
                    <a href="#" className="card-link" onClick={() => editComment(comment)}><i className="glyphicon glyphicon-edit"></i></a>
                    <a href="#" className="card-link" onClick={() => removeComment(comment.id)}><i className="glyphicon glyphicon-trash"></i></a>
                </div>
                <div>
                    <ModalRemove 
                        isOpen={this.state.isModalRemove} 
                        closeModalRemove={this.closeModalRemove} 
                        registro={comment} 
                        removerRegistro={removeComment}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ commentReducer }) => ({
    isModalRemove: commentReducer.isModalRemove
})

const mapDispatchToProps = dispatch => ({
    voteScoreComment: (vote) => dispatch(voteScoreComment(vote)),
    removeComment: (id) => dispatch(removeComment(id)),
    openModalRemoveCommentRedux: () => dispatch(openModalRemoveCommentRedux())
})

export default connect(null, mapDispatchToProps)(Comments);