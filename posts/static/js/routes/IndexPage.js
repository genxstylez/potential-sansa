'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

export default React.createClass({
    mixins: [],

    contextTypes: {
        router: React.PropTypes.func
    },
    
    render() {
        var categoryId = this.context.router.getCurrentParams().categoryId;
        var subcategoryId = this.context.router.getCurrentParams().subcategoryId;

        return (
            <div>
                <Logo />
                <NavBar />
                <BannerList />
                <PostList ref="postlist"
                    categoryId={categoryId} 
                    subcategoryId={subcategoryId} />
                <Footer />
            </div>
        );
    }

});