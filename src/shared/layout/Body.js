import React from 'react';
import Route from 'react-router-dom/Route';

import Posts from '../../components/posts/Posts';
import PostDetail from '../../components/posts/PostDetail';
import Categories from '../../components/categories/Categories';

const Body = () => {
    return (
        <div className="container">
            <Route exact path="/posts" component={Posts} />
            <Route path="/posts/detail/:id" component={PostDetail} />
            <Route path="/categories" component={Categories} />
        </div>
    );
}

export default Body;