'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

export default React.createClass({
    propTypes: {
        static_url: React.PropTypes.string
    },
    render() {
        return (
            <div>
                <Logo static_url={this.props.static_url} />
                <NavBar static_url={this.props.static_url} />
                <BannerList static_url={this.props.static_url} />
                <PostList static_url={this.props.static_url} />
                <Footer />
            </div>
        );
    }

});