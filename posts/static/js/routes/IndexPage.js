'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

export default React.createClass({
    render() {
        return (
            <div>
                <Logo />
                <NavBar />
                <BannerList />
                <PostList />
                <Footer />
            </div>
        );
    }

});