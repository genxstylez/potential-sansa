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
    handleClickOnAlbums() {
        this.setState({
            footer_collapsed: true
        });
    },
    render() {
        return (
            <div className="albums" onClick={this.handleClickOnAlbums}>
                <TransitionGroup transitionName="post">
                    <span className="close">
                        <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                    </span>
                    <div className="albums-header">
                        <span className="circle-divider" />
                        Photo
                        <span className="circle-divider" />
                    </div>

                    <AlbumList />
                </TransitionGroup>
                <LicenseFooter collapsed={this.state.footer_collapsed} />
            </div>
        );
    }

});