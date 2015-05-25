'use strict';

import React from 'react/addons';
import Router from 'react-router';
import Application from './routes/Application';
import IndexPage from './routes/IndexPage';
import PostPage from './routes/PostPage';
import SearchPage from './routes/SearchPage';
import SubscribePage from './routes/SubscribePage';
import AlbumsPage from './routes/AlbumsPage';
import AlbumPage from './routes/AlbumPage';

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

const routes = (
    <Route name="app" path="/" handler={Application} ignoreScrollBehavior>
        <DefaultRoute handler={IndexPage} ignoreScrollBehavior/>
        <Route name="category" path="category/:categoryId" handler={IndexPage} ignoreScrollBehavior/>
        <Route name="subcategory"  path="category/:categoryId/:subcategoryId" handler={IndexPage} ignoreScrollBehavior />
        <Route name="search" path="search" handler={SearchPage}/>
        <Route name="albums" path="albums" handler={AlbumsPage} />
        <Route name="album" path="albums/:albumId" handler={AlbumPage} />
        <Route name="subscribe" path="subscribe" handler={SubscribePage}/>
        <Route name="post" path="post/:postId" handler={PostPage}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, Handler => {
    React.render(<Handler/>, document.querySelector('.react-container'));
});
