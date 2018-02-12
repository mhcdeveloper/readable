import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import Redirect from 'react-router-dom/Redirect';

import { 
    fetchComments, 
    createComment, 
    removeComment, 
    openModalRemoveCommentRedux, 
    openModalCommentRedux, 
    updateComment,
    fetchCommentToEdit,
    openModalToNewComment 
} from '../../actions/CommentsAction';
import { openModalPostRedux, voteScorePost, fetchPostDetail, removePost } from '../../actions/PostsAction'; 
import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import ModalPost from './ModalPost';
import NewEditPost from './NewEditPost';
import NewEdiComment from './comments/NewEditComment';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentEdit: {
                id: '',
                body: '',
                author: '',
                postId: ''
            },
            modalIsOpen: false,
            isModalRemove: false,
            modalIsOpenComment: false,
            categories: [],
            category: '',
        }

        this.handleChangeEditComment = this.handleChangeEditComment.bind(this);
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.buscarDetail();
        this.getAllCategories();
    }
    
    //Responsavel por buscar o detail do post
    buscarDetail = () => {
        let id = this.props.match.params.post_id;
        this.props.fetchPostDetail(id);
    }

    //Responsavel por buscar todos as categorias
    getAllCategories = () => {
        ReadableAPI.getAllCategories()
            .then(categories => this.setState({ categories: categories.categories }));
    }
    
    //Responsavel por abrir o dialog com os input setado
    openEditComment = (commentEdit) => {
        //this.props.fetchCommentToEdit(comment);
        this.setState({ 
            commentEdit
         })
        this.props.openModalCommentRedux();
    }    

    //Metodo responsavel por atualizar o state de cada input
    handleChangeEditComment = (e) => {
        this.setState({
            commentEdit: {
                ...this.state.commentEdit,
                [e.target.name]: e.target.value
            },
        });
    }

    
    //Responsavel por abrir o dialog com os input setado
    openEditPost = (post) => {
        this.props.openModalPostRedux();
    }

    //Responsavel pelo vote score do post
    votePost = (post, option) => {
        const vote = {
            post,
            option,
            typePost: 'postDetail'
        }
        this.props.voteScorePost(vote);
    }
    
    //Responsavel por fechar ou abrir o modal do comment
    changeOpenComment = () => {
        this.props.openModalToNewComment();
    }

    render () {
        const { 
            editPost, 
            removePost, 
            votePost, 
            comments, 
            redirect, 
            isModalRemove, 
            postDetail,
            pageNotFoundDetail
        } = this.props;
        const { commentEdit, categories } = this.state;

        if(pageNotFoundDetail === true) {
            return <Redirect to='/error' />
        }
        
        //Responsavel por fazer o redirect quando for deletado o post
        if(redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                {postDetail ? 
                    <div className="card">
                        <div className="card-block">
                            <div className="btn-card-postDetail">
                                <Link to="/" className="btn btn-primary"><i className="glyphicon glyphicon-arrow-left"></i></Link>
                                <a href="#" className="btn btn-info" onClick={() => this.openEditPost()}><i className="glyphicon glyphicon-edit"></i></a>
                                <a href="#" className="btn btn-danger" onClick={() => removePost(postDetail.id)}><i className="glyphicon glyphicon-trash"></i></a>
                            </div>
                            <h3 className="card-title">{postDetail.title}</h3>
                            <p className="card-text">{postDetail.body}</p>
                            <p className="card-text">{postDetail.author}</p>
                            <p className="card-text">
                                <small className="text-muted">{postDetail.commentCount} <i className="glyphicon glyphicon-comment"></i> </small>
                                <small className="text-muted">{postDetail.voteScore} <i className="glyphicon glyphicon-thumbs-up"></i></small>
                            </p>
                            <a href="#" className="btn btn-primary" onClick={() => this.votePost(postDetail, 1)}><i className="glyphicon glyphicon-thumbs-up"></i></a>
                            <a href="#" className="btn btn-primary" onClick={() => this.votePost(postDetail, 0)}><i className="glyphicon glyphicon-thumbs-down"></i></a>
                            
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
                    <NewEdiComment 
                        postDetail={postDetail}
                        commentEdit={commentEdit}
                        handleChangeEditComment={this.handleChangeEditComment} />
                </div>
                <div>
                    <NewEditPost 
                        categories={categories}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ commentReducer, postReducer }) => ({
    comments: commentReducer.comments,
    postDetail: postReducer.postDetail,
    pageNotFoundDetail: postReducer.pageNotFoundDetail,
    redirect: postReducer.redirect
})

const mapDispatchToProps = dispatch => ({
    fetchComments: (id) => dispatch(fetchComments(id)),
    createComment: (comment, parentId) => dispatch(createComment(comment, parentId)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    openModalRemoveCommentRedux: () => dispatch(openModalRemoveCommentRedux()),
    openModalCommentRedux: () => dispatch(openModalCommentRedux()),
    updateComment: (comment) => dispatch(updateComment(comment)),
    openModalPostRedux: () => dispatch(openModalPostRedux()),
    voteScorePost: (vote) => dispatch(voteScorePost(vote)),
    fetchPostDetail: (id) => dispatch(fetchPostDetail(id)),
    removePost: (post) => dispatch(removePost(post)),
    fetchCommentToEdit: (commentEdit) => dispatch(fetchCommentToEdit(commentEdit)),
    openModalToNewComment: () => dispatch(openModalToNewComment())
})

export default connect (mapStateToProps, mapDispatchToProps)(PostDetail);