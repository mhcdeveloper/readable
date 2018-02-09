import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';


import { 
    fetchComments, 
    createComment, 
    removeComment, 
    openModalRemoveCommentRedux, 
    openModalCommentRedux, 
    updateComment 
} from '../../../actions/CommentsAction';
import ModalComment from './ModalComment'

class NewEditComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentNew: {
                id: '',
                body: '',
                author: '',
                postId: ''
            },
            commentDetail: {
                id: '',
                body: '',
                author: '',
                postId: ''
            }
        }

        this.handleChangeNewComment = this.handleChangeNewComment.bind(this);
    }

    //Metodo responsavel por atualizar o state de cada input do novo comment
    handleChangeNewComment = (e) => {
        this.setState({
            commentNew: {
                ...this.state.commentNew,
                [e.target.name]: e.target.value
            },
        });    
    }

    //Responsavel por fechar ou abrir o modal do comment
    changeOpenComment = () => {
        this.setState({ 
            commentNew: {
                id: '',
                body: '',
                author: '',
                postId: ''
            }
        });
        this.props.openModalCommentRedux();
    }

    //Metodo responsavel por adicionar um novo comentario
    insertComment = (e) => {
        e.preventDefault();
        const { postDetail } = this.props;
        let parentId = postDetail.id;
        const values = serializeForm(e.target, { hash: true });
        if (values.id) {
            this.editComment(values);
        } else {
            //inserir no servidor aqui
            this.props.createComment(values, parentId);
        }
    }

    //Responsavel por editar o comment
    editComment = (comment) => {
        this.props.updateComment(comment);
    }
    
    render () {
        const { commentNew, commentDetail } = this.state;
        const { modalIsOpenComment, newComment, commentEdit, handleChangeEditComment } = this.props;
        console.log(newComment)
        return (
            <div>
                <ModalComment 
                    isOpen={modalIsOpenComment}
                    closeModal={this.changeOpenComment}
                    comment={ newComment ? commentNew : commentEdit}
                    insertComment={this.insertComment}
                    handleChange={ newComment ? this.handleChangeNewComment : handleChangeEditComment}
                />
            </div>
        )
    }
}

const mapStatToProps = ({ commentReducer }) => ({
    modalIsOpenComment: commentReducer.modalIsOpenComment,
    newComment: commentReducer.newComment
})

const mapDispatchToProps = dispatch => ({
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    openModalCommentRedux: () => dispatch(openModalCommentRedux())
})

export default connect(mapStatToProps, mapDispatchToProps)(NewEditComment);