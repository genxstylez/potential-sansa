'use strict';

import React from 'react/addons';
import Router from 'react-router';
import Application from './routes/Application';
import IndexPage from './routes/IndexPage';
import PostPage from './routes/PostPage';
import AlbumsPage from './routes/AlbumsPage';
import AlbumPage from './routes/AlbumPage';

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

const routes = (
    <Route name="app" path="/staff/" handler={Application} ignoreScrollBehavior>
        <DefaultRoute handler={IndexPage} />
        <Route name="home" path="/staff/" handler={IndexPage} />
        <Route name="category" path="category/:categoryId/" handler={IndexPage} />
        <Route name="subcategory" path="category/:categoryId/:subcategoryId/" handler={IndexPage} />
        <Route name="post" path="post/:postId/" handler={PostPage} />
        <Route name="albums" path="albums/" handler={AlbumsPage} />
        <Route name="album" path="albums/:albumId/" handler={AlbumPage} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Root, state) => {
    React.render(<Root />, document.querySelector('.react-container'));
});
