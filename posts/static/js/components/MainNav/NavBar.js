'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import NavItem from './NavItem';

import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';

var Link = Router.Link;

export default React.createClass({
    categories: [],

    /**
     * @type {object[]}
     */
    mixins: [WebAPIMixin, ScrollListenerMixin],

    getInitialState() {
        return {
            categories: [],
            home_text: 'Home',
            subscribe_text: 'Subscribe',
            photo_text: 'Photo'
        }
    },
    /**
     * gets users from web API
     * @private
     */
    _getCategories() {
        this.getCategories((error, response) => {
            this.setState({ categories: error ? [] : response.body.objects });
        });
    },

    componentDidMount() {
        this._getCategories();
    },

    handleSubscribeOnMouseEnter(e) {
        this.setState({
            subscribe_text: '訂閱'
        });
    },

    handleSubscribeOnMouseOut(e) {
        this.setState({
            subscribe_text: 'Subscribe'
        });
    },

    handleHomeOnMouseEnter(e) {
        this.setState({
            home_text: '首頁'
        });
    },

    handleHomeOnMouseOut(e) {
        this.setState({
            home_text: 'Home'
        });
    },

    handlePhotoOnMouseEnter(e) {
        this.setState({
            photo_text: '免費圖庫'
        });
    },

    handlePhotoOnMouseOut(e) {
        this.setState({
            photo_text: 'Photo'
        });
    },

    render() {
        var header_classes = classNames({
            'header': true,
            'col-xs-0': true,
            'col-sm-12': true,
            'col-md-12': true,
            'col-lg-12': true
        });
        var nav_classes = classNames({
            'row': true,
            'nav': true,
            'fixed': this.state.scrollTop > 200,
        });
        var NavItemNodes = [];
        for(var x in this.state.categories) {
            var category = this.state.categories[x]
            NavItemNodes.push(
                <NavItem 
                    key={category.id} 
                    id={category.id} 
                    name={category.name} 
                    zh_name={category.zh_name}
                    children={category.children}
                    uri={category.resource_uri} />
            );
            if (x < this.state.categories.length -1) {
                NavItemNodes.push(<span key={x + 800} className="circle-divider"/>);
            };

        };

        var fb_icon = STATIC_URL + "img/fb.png";
        var search_icon = STATIC_URL + "img/search.png";
            
        return (
             <div className={nav_classes}>
                <div ref="header" className={header_classes}> 
                    <div className="pull-left">
                        <Link to="search">
                            <img className="search" src={search_icon} />
                        </Link>
                    </div>
                    <div className="pull-right">
                        <a href="https://www.facebook.com/OlogyFashion" target="_blank" className="fb">
                            <img src={fb_icon} />
                        </a>
                        <Link to="subscribe" className="subscribe"
                            onMouseEnter={this.handleSubscribeOnMouseEnter}
                            onMouseOut={this.handleSubscribeOnMouseOut}>
                            {this.state.subscribe_text} 
                        </Link>
                    </div>
                    <div className="navbar">
                        <a href="/"
                            onMouseEnter={this.handleHomeOnMouseEnter}
                            onMouseOut={this.handleHomeOnMouseOut}>{this.state.home_text}</a>
                        <span className="circle-divider"/>
                        {NavItemNodes}
                        <span className="circle-divider"/>
                        <Link key="albums" to="albums"
                            onMouseEnter={this.handlePhotoOnMouseEnter}
                            onMouseOut={this.handlePhotoOnMouseOut}>{this.state.photo_text}</Link>
                    </div>
                </div>
            </div>
        );
    }

});