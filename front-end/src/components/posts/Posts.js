import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import Redirect from 'react-router-dom/Redirect';
import { Link } from 'react-router-dom';

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
import { fetchAllPosts } from '../../actions/PostsAction';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                author: '',
                body: '',
                id: '',
                title: '',
                category: '',
            },
            posts: [],
            modalIsOpen: false,
            isModalRemove: false,
            filters: [
                {
                    name: 'TopVoteScore'
                },
                {
                    name: 'DownVoteScore'
                },
                {
                    name: 'Date'
                }
            ],
            filter: ''
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.getAllCategories();
        this.props.fetchAllPosts();
        //this.props.fetchPostsByCategory(category);
    }

    //Responsavel por buscar todos as categorias
    getAllCategories = () => {
        this.props.fetchCategories();
    }

    //Responsavel por alterar as category do state
    setarCategory = (e) => {
        e.preventDefault();
        this.props.setCategory(e.target.value);
    } 

    
    //Responsavel por alterar os filtros
    setarFilter = (e) => {
        const { posts } = this.props;
        e.preventDefault();
        let filter = e.target.value;
        this.setState({
            filter
        })
        
        //Responsavel por fazer o filtro no array do post
        if(filter === 'Date') {
            posts.sort(function(a,b) {return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0);} );
        } else if (filter === 'DownVoteScore') {
            posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} );
        } else {
            posts.sort(function(a,b) {return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);} );
        }
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
                category: '',
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
        const { post, filter, filters } = this.state;
        const { posts, categories, category, isModalRemove, modalIsOpen, openModalPostRedux, loading } = this.props;

        if(category){
            return (
                <Redirect to={`/${category}`} />
            )
        }

        return (
            <div>
                <div className="row">
                    <div>
                        <form>
                            <div>
                                <label htmlFor="category" className="mr-sm-2">Category</label>
                                <select id="category" name="category" className="custom-select mb-2 mr-sm-2 mb-sm-0" value={category} onChange={this.setarCategory} required>
                                <option value=''>All Posts</option>
                                    {categories.map((category) => {
                                        return (
                                            <option key={category.name} value={category.name}>{category.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <br />
                            <div>
                                <label htmlFor="filter" className="mr-sm-2">Filter</label>
                                <select id="filter" name="filter" className="custom-select mb-2 mr-sm-2 mb-sm-0" value={filter} onChange={this.setarFilter} required>
                                <option value=''>Padrão VoteScore</option>
                                    {filters.map((filter) => {
                                        return (
                                            <option key={filter.name} value={filter.name}>{filter.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                {loading
                    ? <ReactLoading delay={200} type='spin' color='#222' className='loading' />
                :
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
                                        category={category}
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
                                categories={categories}
                            />
                        </div>
                    </div>
                }
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
    loading: postReducer.loading,
    category: categoryReducer.category
})

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    removePost: (id) => dispatch(removePost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
    openModalRemovePostRedux: () => dispatch(openModalRemovePostRedux()),
    openModalPostRedux: () => dispatch(openModalPostRedux()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    fetchCategories: (categories) => dispatch(fetchCategories(categories)),
    setCategory: (category) => dispatch(setCategory(category)),
    fetchAllPosts: () => dispatch(fetchAllPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);