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

    /**
     * gets users from web API
     * @private
     */
    _getCategories() {
        this.getCategories((error, response) => {
            this.categories= error ? [] : response.body.objects;
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
        var classes = classNames({
            'header': true,
            'fixed': this.state.scrollTop > 200,
            'col-xs-0': true,
            'col-sm-12': true,
            'col-md-12': true,
            'col-lg-12': true

        });
        const NavItemNodes = [];
        for(var i=0; i < this.categories.length; i++) {

            NavItemNodes.push(<NavItem id={this.categories[i].id} name={this.categories[i].name} uri={this.categories[i].resource_uri} />);
            if (i < this.categories.length -1) {
                NavItemNodes.push(<span className="circle-divider"/>);
            };
        };
            
        return (
             <div className="row nav">
                <div ref="header" className={classes}> 
                    <img className="pull-left search" src="/static/img/search.png"></img>
                    {NavItemNodes}
                    <a href="#" className="pull-right subscribe">Subscribe</a>
                    <a href="http://facebook.com" className="pull-right fb">
                        <img src="/static/img/fb.png"></img>
                    </a>
                </div>
            </div>
        );
    }

});