import React from 'react';
import Route from 'react-router-dom/Route';

import Posts from '../../components/posts/Posts';

const Body = () => {
    return (
        <div className="container">
            <Route path="/posts" component={Posts} />
        </div>
    );
}

export default Body;