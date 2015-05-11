'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import PostTile from './Post/PostTile';
import MansonryMixin from 'react-masonry-mixin';

const Link = Router.Link;

const mansonryOptions = {
    transitionDuration: 0,
    itemSelector: '.tile'
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin],

    pollInterval: 60000,

    propTypes: {
        query : React.PropTypes.string
    },

    getInitialState() {
        return {
            posts: [],
            next_page : null,
            has_next: false,
            is_loading: false
        }
    },

    /*
    onPageScroll() {
        var bottomOffset = this.refs.mansonryContainer.getDOMNode().scrollHeight - this.state.scrollTop;
        if (bottomOffset < 300 && !this.state.is_loading && this.state.has_next) {
            this.setState({
                is_loading: true
            });
            this._getPosts(this.state.next_page);
        }
    },
    */
                
    _getSearchPosts(url, query) {
        this.searchPosts(url, query, (error, response) => {
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
        if (nextProps.query != this.props.query){
            // if category changes, start with a new list of posts
            this.setState({
                posts: []
            });
            this._getSearchPosts(null, nextProps.query);
        }
    },
    /**
     * React component lifecycle method
     */
    componentDidMount() {
        this._getSearchPosts(null, this.props.query);
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
                    heading={post.heading}
                    subheading={post.subheading}
                    cover={post.cover}
                    created_at={post.created_at}
                    last_modified={post.last_modified}
                    articletext={post.articletext}
                    category={post.category.name} />
            );
        });
        var template = PostTileNodes
        var no_results = "No results found for " + this.props.query;
        if (PostTileNodes.length == 0) {
            template = <div className="no-results">
                <span className="circle-divider" />
                {no_results} 
                <span className="circle-divider" />
            </div>
        }
        return (
            <div id="tiles"className="mansonryContainer" ref="mansonryContainer">
                {template}
            </div>
        );
    }

});