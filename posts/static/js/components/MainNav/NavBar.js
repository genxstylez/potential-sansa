'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import NavItem from './NavItem';

import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';

const Link = Router.Link;

export default React.createClass({
    categories: [],

    /**
     * @type {object[]}
     */
    mixins: [WebAPIMixin, ScrollListenerMixin],

    getInitialState() {
        return {
            categories: [],
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
        e.target.text = '訂閱';
    },

    handleSubscribeOnMouseOut(e) {
        e.target.text = 'Subscribe';
    },

    handleHomeOnMouseEnter(e) {
        e.target.text = '首頁';
    },

    handleHomeOnMouseOut(e) {
        e.target.text = 'Home';
    },

    handlePhotoOnMouseEnter(e) {
        e.target.text = '照片';
    },

    handlePhotoOnMouseOut(e) {
        e.target.text = 'Photo';
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
        const NavItemNodes = [<Link key="home" to="/"
                onMouseEnter={this.handleHomeOnMouseEnter}
                onMouseOut={this.handleHomeOnMouseOut}>Home</Link>, 
            <span key="80010" className="circle-divider"/>];
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
        NavItemNodes.push(<span key="80011" className="circle-divider"/>);
        NavItemNodes.push(<Link key="albums" to="albums"
            onMouseEnter={this.handlePhotoOnMouseEnter}
            onMouseOut={this.handlePhotoOnMouseOut}>Photo</Link>);
        
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
                        <a href="http://facebook.com" className="fb">
                            <img src={fb_icon} />
                        </a>
                        <Link to="subscribe" className="subscribe"
                            onMouseEnter={this.handleSubscribeOnMouseEnter}
                            onMouseOut={this.handleSubscribeOnMouseOut}>
                            Subscribe
                        </Link>
                    </div>
                    <div className="navbar">
                        {NavItemNodes}
                    </div>
                </div>
            </div>
        );
    }

});