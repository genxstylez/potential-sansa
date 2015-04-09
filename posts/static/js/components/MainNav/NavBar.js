'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import NavItem from './NavItem';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../ScrollListenerMixin';

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
        this.getCategories(null, (error, response) => {
            this.setState({ categories: error ? [] : response.body.objects });
            this.forceUpdate();
        });
    },

    /**
     * React component lifecycle method
     */
    componentDidMount() {
        this._getCategories();
    },

    /**
     * React component lifecycle method
     */

    /**
     * render
     * @returns {XML}
     */

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
        const NavItemNodes = [];
        for(var x in this.state.categories) {
            var category = this.state.categories[x]
            NavItemNodes.push(
                <NavItem key={category.id} id={category.id} name={category.name} uri={category.resource_uri} />
            );
            if (x < this.state.categories.length -1) {
                NavItemNodes.push(<span className="circle-divider"/>);
            };
        };
        var fb_icon = STATIC_URL + "img/fb.png";
        var search_icon = STATIC_URL + "img/search.png";
            
        return (
             <div className={nav_classes}>
                <div ref="header" className={header_classes}> 
                    <img className="pull-left search" src={search_icon}></img>
                    {NavItemNodes}
                    <a href="#" className="pull-right subscribe">Subscribe</a>
                    <a href="http://facebook.com" className="pull-right fb">
                        <img src={fb_icon}></img>
                    </a>
                </div>
            </div>
        );
    }

});