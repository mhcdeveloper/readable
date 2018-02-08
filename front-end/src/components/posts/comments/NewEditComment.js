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
            comment: {
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
    }

    componentWillReceiveProps() {
        const { commentEdit } = this.props;
        if(commentEdit) {
            this.setState({ commentDetail: commentEdit })
        }
    }
    
    //Metodo responsavel por atualizar o state de cada input
    handleChange = (e) => {
        const { newComment } = this.props;
        e.preventDefault();
        if( newComment ) {
            this.setState({
                comment: {
                    ...this.state.comment,
                    [e.target.name]: e.target.value
                },
            });    
        } else {
            this.setState({
                commentDetail: {
                    ...this.state.commentDetail,
                    [e.target.name]: e.target.value
                },
            });
        }
    }

    //Responsavel por fechar ou abrir o modal do comment
    changeOpenComment = () => {
        this.setState({ 
            comment: {
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
        const { comment } = this.state;
        const { modalIsOpenComment, newComment, commentEdit } = this.props;
        return (
            <div>
                <ModalComment 
                    isOpen={modalIsOpenComment}
                    closeModal={this.changeOpenComment}
                    comment={ newComment ? comment : commentEdit}
                    insertComment={this.insertComment}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}

const mapStatToProps = ({ commentReducer }) => ({
    modalIsOpenComment: commentReducer.modalIsOpenComment,
    commentEdit: commentReducer.commentEdit,
    newComment: commentReducer.newComment
})

const mapDispatchToProps = dispatch => ({
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    openModalCommentRedux: () => dispatch(openModalCommentRedux())
})

export default connect(mapStatToProps, mapDispatchToProps)(NewEditComment);