import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import Redirect from 'react-router-dom/Redirect';

import { voteScorePost, removePost, openModalPostRedux, updatePost, pageNotFound } from '../../actions/PostsAction'; 
import { 
    fetchComments, 
    createComment, 
    removeComment, 
    openModalRemoveCommentRedux, 
    openModalCommentRedux, 
    updateComment 
} from '../../actions/CommentsAction';
import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import ModalPost from './ModalPost';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                author: '',
                body: '',
                id: '',
                title: '',
                category: ''
            },
            comment: {
                id: '',
                body: '',
                author: '',
                postId: ''
            },
            postEdit: {},
            modalIsOpen: false,
            isModalRemove: false,
            modalIsOpenComment: false,
            categories: [],
            category: '',
            pageNotFound: false
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.buscarDetail();
        this.getAllCategories();
    }
    
    //Responsavel por buscar o detail do post
    buscarDetail = () => {
        let id = this.props.match.params.post_id;
        ReadableAPI.getDetail(id)
            .then((post) => {
                if(post.error) {
                    this.setState({ pageNotFound: true });
                } else {
                    return (
                        this.setState({ post }), 
                        this.buscarComentario()
                    )
                }
            })
    }

    //Responsavel por buscar todos as categorias
    getAllCategories = () => {
        ReadableAPI.getAllCategories()
            .then(categories => this.setState({ categories: categories.categories }));
    }

    //Responsavel por buscar os comentario do post
    buscarComentario = () => {
        let id = this.props.match.params.post_id;
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
    
    //Metodo responsavel por atualizar o state de cada input
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            comment: {
                ...this.state.comment,
                [e.target.name]: e.target.value
            },
            post: {
                ...this.state.post,
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

    //Responsavel por editar o comment
    editComment = (comment) => {
        this.props.updateComment(comment);
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
    
    //Responsavel por editar o post
    editPost = (e) => {
        e.preventDefault();
        const post = serializeForm(e.target, { hash: true });
        this.props.updatePost(post);
    }

    //Responsavel por abrir o dialog com os input setado
    openEditPost = (post) => {
        this.setState({
            post: {
                ...post
            },
        });
        this.props.openModalPostRedux();
    }

    //Responsavel pelo vote score do post
    votePost = (post, option) => {
        const vote = {
            post,
            option
        }
        this.props.voteScorePost(vote);
    }

    render () {
        const { 
            editPost, 
            removePost, 
            votePost, 
            comments, 
            redirect, 
            isModalRemove, 
            modalIsOpenComment, 
            modalIsOpen
        } = this.props;
        const { post, comment, categories, pageNotFound } = this.state;

        if(pageNotFound === true) {
            return <Redirect to='/error' />
        }
        //Responsavel por fazer o redirect quando for deletado o post
        else if(redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                {post ? 
                    <div className="card">
                        <div className="card-block">
                            <div className="btn-card-post">
                                <Link to="/" className="btn btn-primary"><i className="glyphicon glyphicon-arrow-left"></i></Link>
                                <a href="#" className="btn btn-info" onClick={() => this.openEditPost(post)}><i className="glyphicon glyphicon-edit"></i></a>
                                <a href="#" className="btn btn-danger" onClick={() => removePost(post.id)}><i className="glyphicon glyphicon-trash"></i></a>
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
                            
                            {comments.map(comment => 
                                <Comments 
                                    key={comment.id} 
                                    comment={comment}
                                    editComment={this.openEditComment}
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
                        closeModal={this.props.openModalPostRedux}
                        post={post}
                        insertPost={this.editPost} 
                        handleChange={this.handleChange}
                        categories={categories}
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
    modalIsOpenComment: commentReducer.modalIsOpenComment,
    modalIsOpen: postReducer.modalIsOpen,
    pageNotFound: postReducer.pageNotFound
})

const mapDispatchToProps = dispatch => ({
    fetchComments: (id) => dispatch(fetchComments(id)),
    createComment: (comment, parentId) => dispatch(createComment(comment, parentId)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    openModalRemoveCommentRedux: () => dispatch(openModalRemoveCommentRedux()),
    openModalCommentRedux: () => dispatch(openModalCommentRedux()),
    updateComment: (comment) => dispatch(updateComment(comment)),
    removePost: (post) => dispatch(removePost(post)),
    openModalPostRedux: () => dispatch(openModalPostRedux()),
    updatePost: (post) => dispatch(updatePost(post)),
    voteScorePost: (vote) => dispatch(voteScorePost(vote)),
    pageNotFound: () => dispatch(pageNotFound())
})

export default connect (mapStateToProps, mapDispatchToProps)(PostDetail);