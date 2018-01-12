import React, { Component } from 'react';
import Comments from './comments/Comments';
import ModalComment from './comments/ModalComment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

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
            .then((post) => this.setState({ post }), this.buscarComentario());
    }

    buscarComentario = () => {
        const id = this.props.match.params.id;
        ReadableAPI.getCommentPost(id)
        .then((comments) => this.setState({ comments }));    
    }

    
    changeOpenComment = () => {
        console.log('ok');
        this.setState({ modalIsOpenComment: !this.state.modalIsOpenComment });
    }
    
    changeOpen = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }
    
     //Metodo responsavel por abrir o modalRemove
     openModalRemove = (post) => {
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

    editPost = (post) => {
        this.setState({
            post,
            modalIsOpen: true
        });
        console.log(post);
    }

    removePost = (post) => {
        console.log(post);
    }

    render () {
        const { editPost, removePost } = this.props;
        const { comments, post, modalIsOpen, isModalRemove, modalIsOpenComment, comment } = this.state;
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
                            <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-thumbs-up"></i></a>
                            <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-thumbs-down"></i></a>
                            
                            {comments.map(comment => 
                                <Comments key={comment.id} comment={comment} 
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
                        handleChange={this.handleChange}
                    />
                </div>
                <div>
                    <ModalPost 
                        isOpen={modalIsOpen}
                        openModal={this.changeOpen}
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

export default PostDetail;