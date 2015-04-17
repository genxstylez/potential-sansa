'use strict';

import React from 'react';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import SubNavBar from '../components/SubNav/SubNavBar';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

export default React.createClass({
    mixins: [],

    contextTypes: {
        router: React.PropTypes.func
    },
    _ScrollDown() {
        var categoryId = this.context.router.getCurrentParams().categoryId;
        setTimeout( () => {
            if (categoryId && $('.tile').length > 0)
                window.scrollTo(0, 600);
        }, 500)
    },
    componentDidMount() {
       this._ScrollDown();
    },
    componentWillUpdate() {
       this._ScrollDown();
    },
    render() {
        var categoryId = this.context.router.getCurrentParams().categoryId;
        var subcategoryId = this.context.router.getCurrentParams().subcategoryId;


        return (
            <div ref="container">
                <Logo />
                <NavBar />
                <BannerList />
                <SubNavBar categoryId={categoryId} />
                <PostList ref="postlist"
                    categoryId={categoryId} 
                    subcategoryId={subcategoryId} />
                <Footer />
            </div>
        );
    }

});