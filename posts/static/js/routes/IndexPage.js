'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import BannerList from '../components/Banner/BannerList';

const Link = Router.Link;

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    /**
     * render
     * @returns {XML}
     */

    render() {
        return (
            <div>
                <Logo />
                <NavBar />
                <BannerList />
                <PostList categoryId={this.context.router.getCurrentParams().categoryId} />
                <Footer />
            </div>
        );
    }

});