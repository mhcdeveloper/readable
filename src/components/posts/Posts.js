import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';

import PostItem from './PostItem';
import ModalPost from './ModalPost';
import ModalRemove from '../../shared/ModalRemove';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                author: '',
                body: '',
                category: '',
                commentCount: '',
                deleted: false,
                id: '',
                timestamp: '',
                title: '',
                voteScore: '',
            },
            posts: [],
            modalIsOpen: false,
            isModalRemove: false
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        ReadableAPI.getAll()
            .then((posts) => this.setState({ posts }));

        console.log(this.state.posts);
    }

    openModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
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

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            post: {
                [e.target.name]: e.target.value
            }
        })
    }

    insertPost = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        const { post } = this.state;
        if (post.id) {
            this.editPost(values);
        } else {
            //inserir no servidor aqui
            this.setState({ post: {} });
        }
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
        const { posts, post, modalIsOpen, isModalRemove } = this.state;
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
                                editPost={this.editPost}
                                removePost={this.openModalRemove} 
                            />
                        );
                    })}
                </div>
                <div>
                    <ModalPost 
                        isOpen={modalIsOpen}
                        openModal={this.openModal}
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

export default Posts;