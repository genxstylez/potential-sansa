'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import AlbumList from '../components/Photo/AlbumList';
import LicenseFooter from '../components/Photo/LicenseFooter';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Navigation = require('react-router').Navigation;


export default React.createClass({
    mixins: [Navigation],
    getInitialState() {
        return ({
            footer_collapsed: false
        });
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
                    <NavBar />
                    <AlbumList />
                </TransitionGroup>
                <LicenseFooter collapsed={this.state.footer_collapsed} />
            </div>
        );
    }

});