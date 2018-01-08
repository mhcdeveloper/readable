import React, { Component } from 'react';
import * as ReadableAPI  from '../../shared/utils/ReadableAPI';

import PostItem from './PostItem';
import ModalPost from './ModalPost';

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
        }
    }

    componentDidMount() {
        ReadableAPI.getAll()
            .then((posts) => this.setState({ posts }));

        console.log(this.state.posts);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            post: {
                [e.target.name]: e.target.value
            }
        })
    }

    render () {
        const { posts, post } = this.state;
        return (
            <div>
                <div>
                    {posts.map((post) => {
                        return (
                            <PostItem 
                                key={post.id}
                                post={post} 
                            />
                        );
                    })}
                </div>
                <div>
                    <ModalPost 
                        post={post} 
                        handleChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export default Posts;