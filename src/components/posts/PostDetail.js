import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

import { voteScorePost, removePost } from '../../actions/PostsAction'; 
import { fetchComments, createComment, removeComment } from '../../actions/CommentsAction';
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
            modalIsOpenComment: !this.state.modalIsOpenComment,
            comment: {
                id: '',
                body: '',
                author: '',
                postId: ''
            } 
        });
    }
    
    changeOpen = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }
    
    //Metodo responsavel por abrir o modalRemove
    openModalRemove = (post, comment) => {
        this.setState({
            isModalRemove: !this.state.isModalRemove,
            post
        });
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
    
    //Metodo responsavel por editar um post
    editPost = (post) => {
        this.setState({
            post,
            modalIsOpen: true
        });
        console.log(post);
    }

    //Metodo responsavel por remover o post
    removePost = (post, index) => {
        this.props.removePost(post.id, index);
    }
    
    //Metodo responsavel por vote score do post
    votePost = (post, option) => {
        const vote = {
            post,
            option
        }
        this.props.voteScorePost(vote);
    }

    //Metodo responsavel por adicionar um novo comentario
    insertComment = (e) => {
        e.preventDefault();
        const { comment, post } = this.state;
        let parentId = post.id;
        const values = serializeForm(e.target, { hash: true });
        if (comment.id) {
            this.editComment(values);
        } else {
            //inserir no servidor aqui
            this.props.createComment(values, parentId);
        }
    }
    
    //Metodo responsavel por editar um post
    editComment = (comment) => {
        this.setState({
            comment: {
                ...comment
            },
            modalIsOpenComment: true
        });
        console.log(comment);
    }
    
    //Metodo responsavel por remover o comment
    removeComment = (comment) => {
        this.props.removeComment(comment.id);
    }
    
    render () {
        const { editPost, removePost, comments, redirect } = this.props;
        const { post, modalIsOpen, isModalRemove, modalIsOpenComment, comment } = this.state;
        
        //Responsavel por fazer o redirect quando for deletado o post
        if(redirect) {
            console.log(redirect)
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
                            <a href="#" className="btn btn-primary" onClick={() => this.votePost(post, 1)}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                            <a href="#" className="btn btn-primary" onClick={() => this.votePost(post, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></a>
                            
                            {comments.filter(comment => comment.deleted === false).map(comment => 
                                <Comments 
                                    key={comment.id} 
                                    comment={comment}
                                    editComment={this.editComment}
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
    redirect: postReducer.redirect
})

const mapDispatchToProps = dispatch => ({
    fetchComments: (id) => dispatch(fetchComments(id)),
    createComment: (comment, parentId) => dispatch(createComment(comment, parentId)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    voteScorePost: (vote) => dispatch(voteScorePost(vote)),
    removePost: (post) => dispatch(removePost(post))
})

export default connect (mapStateToProps, mapDispatchToProps)(PostDetail);