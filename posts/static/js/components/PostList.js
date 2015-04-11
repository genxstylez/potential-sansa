'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import PostTile from './PostTile';
import MansonryMixin from 'react-masonry-mixin';
import ScrollListenerMixin from '../ScrollListenerMixin';

const Link = Router.Link;

const mansonryOptions = {
    transitionDuration: 0
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin],

    pollInterval: 60000,

    propTypes: {
        categoryId: React.PropTypes.string,
        subcategoryId: React.PropTypes.string
    },

    getInitialState() {
        return {
            posts: [],
            next_page : null,
            has_next: false,
            is_loading: false
        }
    },

    buildTiles(posts) {
        return posts.map(function(post) {
            return (
                <PostTile 
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
    },

    onPageScroll() {
        var bottomOffset = this.refs.mansonryContainer.getDOMNode().scrollHeight - this.state.scrollTop;
        if (bottomOffset < 300 && !this.state.is_loading && this.state.has_next) {
            this.setState({
                is_loading: true
            });
            this._getPosts(this.state.next_page);
        }
    },
                
    _getPosts(url, categoryId, subcategoryId) {
        this.getPosts(url, categoryId, subcategoryId, (error, response) => {
            var new_elements = error ? [] : response.body.objects,
                next_page = response.body.meta.next, 
                has_next = response.body.meta.next != null; 
            this.setState({
                posts: this.state.posts.concat(new_elements),
                next_page: next_page,
                has_next: has_next,
                is_loading: false
            });
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryId != this.props.categoryId || nextProps.subcategoryId != this.props.subscategoryId){
            // if category changes, start with a new list of posts
            this.setState({
                posts: []
            });
            this._getPosts(null, nextProps.categoryId, nextProps.subcategoryId);
        }
    },
    /**
     * React component lifecycle method
     */
    componentDidMount() {
        this._getPosts(null, this.props.categoryId, this.props.subcategoryId);
    },

    /**
     * render
     * @returns {XML}
     */

    render() {
        const PostTileNodes = _.map(this.state.posts, post => {
            return (
                <PostTile 
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