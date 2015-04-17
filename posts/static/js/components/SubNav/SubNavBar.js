'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import SubNavItem from './SubNavItem';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        categoryId: React.PropTypes.string,
    },

    /**
     * @type {object[]}
     */
    mixins: [WebAPIMixin, ScrollListenerMixin],

    /**
     * gets users from web API
     * @private
     */
    _getCategories(categoryId) {
        this.getCategories(categoryId, (error, response) => {
            this.setState({categories: error ? [] : response.body.objects});
        });
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps.categoryId)
            this._getCategories(nextProps.categoryId);
        else
            this.setState({categories: []});
    },

    getInitialState() {
        return {
            categories: [],
        }
    },

    componentDidMount() {
        if(this.props.categoryId)
            this._getCategories(this.props.categoryId);
    },

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
            'sub-nav': true,
            'fixed': this.state.scrollTop > 200,
        });
       
        var template = null;
        if(this.state.categories.length > 0) {
            const NavItemNodes = [];
            for(var x in this.state.categories) {
                var category = this.state.categories[x]

                NavItemNodes.push(
                    <SubNavItem key={category.id} 
                        parent_id={this.props.categoryId} 
                        id={category.id}
                        name={category.name} 
                        uri={category.resource_uri} />
                );

                if (x < this.state.categories.length -1) {
                    NavItemNodes.push(<span className="circle-divider"/>);
                };
            };
            template = <div className={nav_classes}>
                <div className={header_classes}>
                    <div className="sub-nav-inner">
                        <div className="nav-selected">{this.state.categories[0].parent.name}</div>
                        <div className="sub-nav-filters pull-right">
                            {NavItemNodes}
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            <div>
                {template}
            </div>
        );
    }

});