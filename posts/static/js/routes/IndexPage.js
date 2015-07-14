'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import WebAPIMixin from '../mixins/WebAPIMixin';

export default React.createClass({
    mixins: [WebAPIMixin], 

    getInitialState() {
        return({
            categories: []
        });
    },
    
    _getCategories() {
        this.getCategories((error, response) => {
            this.setState({ categories: error ? [] : response.body.objects });
        });
    },

    componentDidMount() {
        this._getCategories();
    },

    render() {
        return (
            <div>
                <Logo />
                <NavBar categories={this.state.categories}/>
                <BannerList />
                <PostList categories={this.state.categories}/>
                <Footer />
            </div>
        );
    }

});