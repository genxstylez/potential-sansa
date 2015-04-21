'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import SubNavItem from './SubNavItem';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        query: React.PropTypes.string
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
    },

    getInitialState() {
    },

    componentDidMount() {
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
        return (
            <div>
                <div className={nav_classes}>
                    <div className={header_classes}>
                        <div className="sub-nav-inner">
                            <div className="nav-selected">Search Results</div>
                            <div className="sub-nav-filters pull-right">
                                {this.props.query}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});