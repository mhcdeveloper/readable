import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

import { getAllComments } from '../../actions/CommentsAction';
import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import ModalRemove from '../../shared/ModalRemove';
import ModalPost from './ModalPost';

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

    buscarComentario = () => {
        const id = this.props.match.params.id;
        ReadableAPI.getCommentPost(id)
        .then((comments) => this.props.getAllComments(comments));    
    }

    
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
    removePost = (post) => {
        console.log(post);
    }
    
    //Metodo responsavel por up vote no post
    upVote = () => {
        console.log('up')
    }
    
    //Metodo responsavel por down vote no post
    downVote = () => {
        console.log('down')
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
            ReadableAPI.createComment(values, parentId)
                .then(res => console.log(res))
                .catch(err => console.log(err));
//            this.props.createPost(values);
  //          this.setState({ post: {} });
        }
    }
    
    //Metodo responsavel por editar um post
    editComment = (comment) => {
        this.setState({
            comment,
            modalIsOpenComment: true
        });
        console.log(comment);
    }
    
    //Metodo responsavel por remover o comment
    removeComment = (comment) => {
        console.log(comment);
    }
    
    
    render () {
        const { editPost, removePost, comments } = this.props;
        const { post, modalIsOpen, isModalRemove, modalIsOpenComment, comment } = this.state;
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
                            <a href="#" className="btn btn-primary" onClick={() => this.upVote()}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                            <a href="#" className="btn btn-primary" onClick={() => this.downVote()}><i className="glyphicon glyphicon-thumbs-down"></i></a>
                            
                            {comments.map(comment => 
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
const mapStateToProps = ({ commentReducer }) => ({
    comments: commentReducer.comments,
})

const mapDispatchToProps = dispatch => ({
    getAllComments: (comments) => dispatch(getAllComments(comments))
})

export default connect (mapStateToProps, mapDispatchToProps)(PostDetail);