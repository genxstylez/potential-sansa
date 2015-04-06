'use strict';

import React from 'react';
import Router from 'react-router';
import Application from './routes/Application';
import IndexPage from './routes/IndexPage';
import PostPage from './routes/PostPage';

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

const routes = (
    <Route name="app" path="/" handler={Application}>
        <DefaultRoute handler={IndexPage}/>
        <Route name="category" path="category/:categoryId" handler={IndexPage}/>
        <Route name="post" path="post/:postId" handler={PostPage}/>
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.querySelector('.react-container'));
});