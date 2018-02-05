import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

import PostItem from '../posts/PostItem';
import ModalPost from '../posts/ModalPost';
import * as ReadableAPI from '../../shared/utils/ReadableAPI';
import CategoryItem from './CategoryItem';
import ModalCategory from './ModalCategory';
import { fetchPostsByCategory } from '../../actions/PostsAction';

class Categories extends Component {
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
            filter: '',
            modalIsOpen: false
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        let category = this.props.match.params.category;
        this.props.fetchPostsByCategory(category);
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
        const { posts, categories, isModalRemove, modalIsOpen, openModalPostRedux, loading } = this.props;

        return (
            <div>
                <div className="row">
                    <div>
                        <form>
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
                        <Link to="/" className="btn btn-primary"><i className="glyphicon glyphicon-arrow-left"></i></Link>
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
    categories: categoryReducer.categories
})

const mapDispatchToProps = dispatch => ({
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);