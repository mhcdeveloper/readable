import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

import { voteScorePost, removePost, openModalPostRedux, updatePost, pageNotFound } from '../../actions/PostsAction'; 
import ModalPost from './ModalPost';

class NewEditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postEdit: {
                author: '',
                body: '',
                id: '',
                title: '',
                category: ''
            }
        }
    }


    //Metodo de life cycle responsavel por setar o postDetail ao postEdit para o modal modificar os inputs
    componentWillReceiveProps() {
        const { postDetail } = this.props;
        if(postDetail) {
            this.setState({ postEdit: postDetail })
        }
    }

    //Metodo responsavel por atualizar o state de cada input
    changePostInput = (e) => {
        e.preventDefault();
        this.setState({
            postEdit: {
                ...this.state.postEdit,
                [e.target.name]: e.target.value
            }
        });
    }

    //Responsavel por editar o post
    editPost = (e) => {
        e.preventDefault();
        const post = serializeForm(e.target, { hash: true });
        this.props.updatePost(post);
    }

    render () {
        const { categories, modalIsOpen, post } = this.props;
        const { postEdit } = this.state;

        return (
            <div>
                <ModalPost
                    isOpen={modalIsOpen}
                    closeModal={this.props.openModalPostRedux}
                    post={postEdit}
                    categories={categories}
                    insertPost={this.editPost} 
                    handleChange={this.changePostInput}
                    categories={categories}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ postReducer }) => ({
    isModalRemove: postReducer.isModalRemove,
    redirect: postReducer.redirect,
    modalIsOpen: postReducer.modalIsOpen,
    pageNotFound: postReducer.pageNotFound,
    postDetail: postReducer.postDetail
})

const mapDispatchToProps = dispatch => ({
    updatePost: (post) => dispatch(updatePost(post)),
    voteScorePost: (vote) => dispatch(voteScorePost(vote)),
    pageNotFound: () => dispatch(pageNotFound()),
    openModalPostRedux: () => dispatch(openModalPostRedux())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewEditPost);