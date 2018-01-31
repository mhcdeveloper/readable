import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

import { voteScorePost } from '../../actions/PostsAction'; 
import { 
    fetchComments, 
    createComment, 
    removeComment, 
    openModalRemoveCommentRedux, 
    openModalCommentRedux, 
    updateComment 
} from '../../actions/CommentsAction';
import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import ModalRemove from '../../shared/ModalRemove';
import ModalPost from './ModalPost';
import Redirect from 'react-router-dom/Redirect';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            comments: [],
            comment: {
                id: '',
                body: '',
                author: '',
                postId: ''
            },
            postEdit: {},
            modalIsOpen: false,
            isModalRemove: false,
            modalIsOpenComment: false
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.buscarDetail();
    }
    
    //Responsavel por buscar o detail do post
    buscarDetail = () => {
        const id = this.props.match.params.id;
        ReadableAPI.getDetail(id)
            .then((post) => {
                return (
                    this.setState({ post }), 
                    this.buscarComentario()
                )
            });
    }

    //Responsavel por buscar os comentario do post
    buscarComentario = () => {
        const id = this.props.match.params.id;
        this.props.fetchComments(id);    
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
    
    changeOpen = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }
    
    //Metodo responsavel por abrir o modalRemove
    openModalRemove = (post, comment) => {
        this.setState({
            post
        });
        this.props.openModalRemoveCommentRedux();
    }

    //Responsavel por fechar o modal remove
    closeModalRemove = () => {
        this.setState({
            modalIsOpen: false,
            isModalRemove: false
        });
    }
    
    //Metodo responsavel por atualizar o state de cada input
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            comment: {
                ...this.state.comment,
                [e.target.name]: e.target.value
            }
        });
    }
    
    //Metodo responsavel por adicionar um novo comentario
    insertComment = (e) => {
        e.preventDefault();
        const { post } = this.state;
        let parentId = post.id;
        const values = serializeForm(e.target, { hash: true });
        if (values.id) {
            this.editComment(values);
        } else {
            //inserir no servidor aqui
            this.props.createComment(values, parentId);
        }
    }

    //Responsavel por abrir o dialog com os input setado
    openEditComment = (comment) => {
        this.setState({
            comment: {
                ...comment
            },
        });
        this.props.openModalCommentRedux();
    }    

    //Metodo responsavel por editar um post
    editComment = (comment) => {
        this.props.updateComment(comment);
    }
    
    //Metodo responsavel por remover o comment
    removeComment = (comment) => {
        this.props.removeComment(comment.id);
    }
    
    render () {
        const { editPost, removePost, votePost, comments, redirect, isModalRemove, modalIsOpenComment } = this.props;
        const { post, modalIsOpen, comment } = this.state;
        
        //Responsavel por fazer o redirect quando for deletado o post
        if(redirect) {
            return <Redirect to='/posts' />
        }
        return (
            <div>
                {post ? 
                    <div className="card">
                        <div className="card-block">
                            <div className="btn-card-post">
                                <Link to="/posts" className="btn btn-primary"><i className="glyphicon glyphicon-arrow-left"></i></Link>
                                <a href="#" className="btn btn-info" onClick={() => this.editPost(post)}><i className="glyphicon glyphicon-edit"></i></a>
                                <a href="#" className="btn btn-danger" onClick={() => this.openModalRemove(post)}><i className="glyphicon glyphicon-trash"></i></a>
                            </div>
                            <h3 className="card-title">{post.title}</h3>
                            <p className="card-text">{post.body}</p>
                            <p className="card-text">{post.author}</p>
                            <p className="card-text">
                                <small className="text-muted">{post.commentCount} <i className="glyphicon glyphicon-comment"></i> </small>
                                <small className="text-muted">{post.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                            </p>
                            <a href="#" className="btn btn-primary" onClick={() => votePost(post, 1)}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                            <a href="#" className="btn btn-primary" onClick={() => votePost(post, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></a>
                            
                            {comments.map(comment => 
                                <Comments 
                                    key={comment.id} 
                                    comment={comment}
                                    editComment={this.openEditComment}
                                    removeComment={this.removeComment}
                                />)}
                            <div className="btn-new-comment">
                                <button className="btn btn-primary" onClick={this.changeOpenComment}>New Comment</button>
                            </div>
                        </div>
                    </div>
                    : null
                }
                <div>
                    <ModalComment 
                        isOpen={modalIsOpenComment}
                        closeModal={this.changeOpenComment}
                        comment={comment}
                        insertComment={this.insertComment}
                        handleChange={this.handleChange}
                    />
                </div>
                <div>
                    <ModalPost 
                        isOpen={modalIsOpen}
                        closeModal={this.changeOpen}
                        post={post}
                        insertPost={this.editPost} 
                        handleChange={this.handleChange}
                    />
                </div> 
                <div>
                    <ModalRemove 
                        isOpen={isModalRemove} 
                        closeModalRemove={this.closeModalRemove} 
                        registro={post} 
                        removerRegistro={this.removePost}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ commentReducer, postReducer }) => ({
    comments: commentReducer.comments,
    isModalRemove: postReducer.isModalRemove,
    redirect: postReducer.redirect,
    modalIsOpenComment: commentReducer.modalIsOpenComment
})

const mapDispatchToProps = dispatch => ({
    fetchComments: (id) => dispatch(fetchComments(id)),
    createComment: (comment, parentId) => dispatch(createComment(comment, parentId)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    openModalRemoveCommentRedux: () => dispatch(openModalRemoveCommentRedux()),
    openModalCommentRedux: () => dispatch(openModalCommentRedux()),
    updateComment: (comment) => dispatch(updateComment(comment))
})

export default connect (mapStateToProps, mapDispatchToProps)(PostDetail);