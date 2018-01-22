import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import ModalPost from './ModalPost';
import ModalRemove from '../../shared/ModalRemove';
import { createPost, getAll } from '../../actions/PostsAction';

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

    componentDidMount() {
        Modal.setAppElement('body');
        ReadableAPI.getAll()
            .then( res => this.props.getAll(res));
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
            ReadableAPI.createPost(values)
       //         .then(res => console.log(res))
         //       .catch(err => console.log(err));
//            this.props.createPost(values);
            this.setState({ post: {} });
        }
    }

    editPost = (post) => {
        this.setState({
            post,
            modalIsOpen: true
        });

        ReadableAPI.updatePost(this.state.post)
            .then((res) => console.log(res));
    }

    removePost = (post) => {
    //    console.log(post);
    }

    render () {
        const { post, modalIsOpen, isModalRemove } = this.state;
        const { posts } = this.props;
        return (
            <div>
                {console.log(this.props.posts)}
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

const mapStateToProps = ( state ) => ({
    posts: state.posts,
    open: state.open
})

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    getAll: (posts) => dispatch(getAll(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);