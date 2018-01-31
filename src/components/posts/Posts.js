import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import ModalPost from './ModalPost';
import ModalRemove from '../../shared/ModalRemove';
import { 
    createPost, 
    fetchPosts, 
    removePost, 
    updatePost, 
    voteScorePost, 
    openModalRemovePostRedux,
    openModalPostRedux 
} from '../../actions/PostsAction';

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

    //Responsavel por atualizar os input
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            post: {
                ...this.state.post,
                [e.target.name]: e.target.value
            }
        })
    }

    //Responsavel por inserir um post
    insertPost = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        if (values.id) {
            this.editPost(values);
        } else {
            //inserir no servidor aqui
            this.props.createPost(values);
        }
    }

    //Responsavel por editar o post
    editPost = (post) => {
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

    //Responsavel por remover o post
    removePost = (post) => {
        this.props.removePost(post.id);
    }

    render () {
        const { post } = this.state;
        const { posts, isModalRemove, modalIsOpen, openModalPostRedux } = this.props;
        return (
            <div>
                <div className="open-modal-post">
                    <button onClick={openModalPostRedux}>+</button>
                </div>
                <div>
                    {posts.map((post) => {
                        return (
                            <PostItem 
                                key={post.id}
                                post={post}
                                editPost={this.openEditPost}
                                removePost={this.removePost} 
                            />
                        );
                    })}
                </div>
                <div>
                    <ModalPost 
                        isOpen={modalIsOpen}
                        closeModal={openModalPostRedux}
                        post={post}
                        insertPost={this.insertPost} 
                        handleChange={this.handleChange}
                    />
                </div>
                <div>
                    <ModalRemove 
                        isOpen={isModalRemove} 
                        closeModalRemove={openModalRemovePostRedux} 
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
    isModalRemove: postReducer.isModalRemove,
    modalIsOpen: postReducer.modalIsOpen
})

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(removePost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
    openModalRemovePostRedux: () => dispatch(openModalRemovePostRedux()),
    openModalPostRedux: () => dispatch(openModalPostRedux())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);