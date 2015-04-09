'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import PostTile from './PostTile';
import MansonryMixin from 'react-masonry-mixin';

const Link = Router.Link;

const masonryOptions = {
    transitionDuration: 0
}


export default React.createClass({
    propTypes: {
        categoryId: React.PropTypes.string,
        subcategoryId: React.PropTypes.string
    },

    pollInterval: 60000,
    /**
     * @type {object[]}
     */
    posts: [],
    
    /**
     * @type {object[]}
     */
    mixins: [MansonryMixin('mansonryContainer', masonryOptions), WebAPIMixin],
   // mixins: [WebAPIMixin],

    /**
     * gets posts from web API
     * @private
     */
    _getPosts(categoryId, subcategoryId) {
        this.getPosts(categoryId, subcategoryId, (error, response) => {
            this.posts = error ? [] : response.body.objects;
            this.forceUpdate();
        });
    },
    componentWillReceiveProps(nextProps) {
        this._getPosts(nextProps.categoryId, nextProps.subcategoryId);
    },
    /**
     * React component lifecycle method
     */
    componentDidMount() {
        this._getPosts(this.props.categoryId, this.props.subcategoryId);
        this.interval = setInterval(() => {
            this._getPosts(this.props.categoryId, this.props.subcategoryId);
        }, this.pollInterval);
    },

    componentWillUnmount() {
        if (_.has(this, 'interval')) {
            clearInterval(this.interval);
        }
    },

    /**
     * render
     * @returns {XML}
     */

    render() {
        const PostTileNodes = _.map(this.posts, post => {
            return (
                <PostTile 
                    ref="tile"
                    key={post.id} 
                    id={post.id} 
                    zh_title={post.zh_title}
                    en_title={post.en_title}
                    cover={post.cover[0]}
                    created_at={post.created_at}
                    last_modified={post.last_modified}
                    content={post.articletext}
                    category={post.category.name}
                    uri={post.resource_uri} />
            );
        });
        return (
            <div className="mansonryContainer" ref="mansonryContainer">
                {PostTileNodes}
            </div>
        );
    }

});