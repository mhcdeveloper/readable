import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import ModalPost from './ModalPost';
import ModalRemove from '../../shared/ModalRemove';
import { createPost, fetchPosts, removePost, updatePost } from '../../actions/PostsAction';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                author: '',
                body: '',
                id: '',
                title: '',
            },
            posts: [],
            modalIsOpen: false,
            isModalRemove: false
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.props.fetchPosts();
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }    

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            post: {
                author: '',
                body: '',
                id: '',
                title: '',
            }
        });
    }

    //Metodo responsavel por abrir o modalRemove
    openModalRemove = (post) => {
        this.setState({
            isModalRemove: !this.state.isModalRemove,
            post
        });
    }

    //Responsavel por fechar o modalRemove
    closeModalRemove = () => {
        this.setState({
            modalIsOpen: false,
            isModalRemove: false
        });
    }

    //Responsavel por atualizar os input
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            post: {
                [e.target.name]: e.target.value
            }
        })
    }

    //Responsavel por inserir um post
    insertPost = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        const { post } = this.state;
        if (post.id) {
            this.editPost(values);
        } else {
            //inserir no servidor aqui
            this.props.createPost(values);
        }
    }

    //Responsavel por editar o post
    editPost = (post) => {
        this.setState({
            post: {
                ...post
            }
        })
        this.props.updatePost(this.state.post);
    }

    //Responsavel por abrir o dialog com os input setado
    openEditPost = (post) => {
        this.setState({
            post: {
                ...post
            },
            modalIsOpen: true
        });
    }

    //Responsavel por remover o post
    removePost = (post) => {
    //    console.log(post);
        this.props.removePost(post.id);
    }

    render () {
        const { post, modalIsOpen, isModalRemove } = this.state;
        const { posts } = this.props;
        return (
            <div>
                <div className="open-modal-post">
                    <button onClick={this.openModal}>+</button>
                </div>
                <div>
                    {posts.map((post) => {
                        return (
                            <PostItem 
                                key={post.id}
                                post={post}
                                editPost={this.openEditPost}
                                removePost={this.openModalRemove} 
                            />
                        );
                    })}
                </div>
                <div>
                    <ModalPost 
                        isOpen={modalIsOpen}
                        closeModal={this.closeModal}
                        post={post}
                        insertPost={this.insertPost} 
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

const mapStateToProps = ({ postReducer }) => ({
    posts: postReducer.posts,
})

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(removePost(id)),
    updatePost: (post) => dispatch(updatePost(post)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);