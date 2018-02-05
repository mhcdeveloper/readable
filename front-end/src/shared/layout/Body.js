import React from 'react';
import Route from 'react-router-dom/Route';

import Posts from '../../components/posts/Posts';
import PostDetail from '../../components/posts/PostDetail';
import Categories from '../../components/categories/Categories';
import PageError from '../error/PageError';

const Body = () => {
    return (
        <div className="container">
            <Route exact path="/" component={Posts} />
            <Route exact path="/:category" component={Categories} />
            <Route exact path="/:category/:post_id" component={PostDetail} />
            <Route exact path="/error" component={PageError} />
        </div>
    );
}

export default Body;