'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import AlbumList from '../components/Photo/AlbumList';
import LicenseFooter from '../components/Photo/LicenseFooter';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
import WebAPIMixin from '../mixins/WebAPIMixin';
var Navigation = require('react-router').Navigation;


export default React.createClass({
    mixins: [WebAPIMixin, Navigation],

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
    handeClickOnCross() {
        if(!this.goBack()) {
            this.transitionTo('/')
       }
    },
    render() {
        return (
            <div className="albums">
                <TransitionGroup transitionName="post">
                    <NavBar categories={this.state.categories} />
                    <AlbumList />
                </TransitionGroup>
                <LicenseFooter />
            </div>
        );
    }

});