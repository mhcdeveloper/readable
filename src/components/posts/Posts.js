import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import ModalPost from './ModalPost';
import { 
    createPost, 
    fetchPostsByCategory,
    removePost, 
    updatePost, 
    voteScorePost, 
    openModalRemovePostRedux,
    openModalPostRedux 
} from '../../actions/PostsAction';
import { fetchCategories, setCategory } from '../../actions/CategoryAction';

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
            isModalRemove: false,
            categories: [],
            category: ''
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.getAllCategories();
        let category = '';
        this.props.fetchPostsByCategory(category);
    }

    //Responsavel por buscar todos as categorias
    getAllCategories = () => {
        ReadableAPI.getAllCategories()
            .then(categories => this.setState({ categories: categories.categories }));
    }

    //Responsavel por alterar as category do action creator
    setarCategory = (e) => {
        e.preventDefault();
        this.setState({
            category: e.target.value
        })
        this.props.fetchPostsByCategory(e.target.value);
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

    //Responsavel por limpar os campos do modal e chamar o metodo que abre ou fecha o modal
    changeOpenModal = () => {
        this.setState({
            post: {
                author: '',
                body: '',
                id: '',
                title: '',
            },
        })
        this.props.openModalPostRedux();
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
        const { post, categories, category } = this.state;
        const { posts, isModalRemove, modalIsOpen, openModalPostRedux } = this.props;
        return (
            <div>
                <div>
                    <form>
                        <select id="unidadeMedida" name="unidade_medida" value={category} onChange={this.setarCategory} required>
                        <option value=''>All Posts</option>
                            {categories.map((category) => {
                                return (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                );
                            })}
                        </select>
                    </form>
                </div>
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
                        closeModal={this.changeOpenModal}
                        post={post}
                        insertPost={this.insertPost} 
                        handleChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ postReducer, categoryReducer }) => ({
    posts: postReducer.posts,
    isModalRemove: postReducer.isModalRemove,
    modalIsOpen: postReducer.modalIsOpen,
    category: categoryReducer.category,
    categories: categoryReducer.categories,
})

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    removePost: (id) => dispatch(removePost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
    openModalRemovePostRedux: () => dispatch(openModalRemovePostRedux()),
    openModalPostRedux: () => dispatch(openModalPostRedux()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    fetchCategories: (categories) => dispatch(fetchCategories(categories)),
    setCategory: (category) => dispatch(setCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);