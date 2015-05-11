'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import PostTile from './Post/PostTile';
import MansonryMixin from 'react-masonry-mixin';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

const Link = Router.Link;

const mansonryOptions = {
    transitionDuration: '0.2s'
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin],

    propTypes: {
        categoryId: React.PropTypes.string,
        subcategoryId: React.PropTypes.string
    },

    getInitialState() {
        return {
            posts: [],
            next_page : null,
            has_next: false,
            is_loading: false,
            is_animating_scrolling: false
        }
    },

    onPageScroll() {
        var bottomOffset = React.findDOMNode(this.refs.mansonryContainer).scrollHeight - this.state.scrollTop;
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
                is_loading: false,
            });
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryId != this.props.categoryId || nextProps.subcategoryId != this.props.subcategoryId){
            // if category changes, start with a new list of posts
            this.setState({
                posts: [],
                has_next: false,
                next_page: null,
                is_animating_scrolling: false
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

    componentWillUpdate(nextProps, nextState) {
        if (this.state.posts && !this.state.is_animating_scrolling && this.props.categoryId) {
            this.setState({is_animating_scrolling: true})
            $.scrollTo('620px', 500);
        }; 
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
                    cover={post.cover[0]}
                    created_at={post.created_at}
                    last_modified={post.last_modified}
                    articletext={post.articletext}
                    category={post.category.name}
                    uri={post.resource_uri} />
            );
        });
        return (
            <div id="tiles"className="mansonryContainer" ref="mansonryContainer">
                {PostTileNodes}
            </div>
        );
    }

});