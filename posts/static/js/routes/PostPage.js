'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import PostContent from '../components/PostContent';

const Link = Router.Link;

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    /**
     * @type {number}
     */
    pollInterval: 5000,

    /**
     * @type {object[]}
     */
    post: '',

    /**
     * @type {object[]}
     */
    mixins: [WebAPIMixin],

    
    /**
     * render
     * @returns {XML}
     */
    render() {
        return (
            <PostContent id={this.context.router.getCurrentParams().postId} />
        );
    }

});