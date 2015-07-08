'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import PostPage from '../routes/PostPage';
import WebAPIMixin from '../mixins/WebAPIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import PostTile from './Post/PostTile';
import MansonryMixin from 'react-masonry-mixin';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var State = require('react-router').State;

const Link = Router.Link;

const mansonryOptions = {
    transitionDuration: 0
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin, State],

    getInitialState() {
        return {
            posts: [],
            categoryId: null,
            subcategoryId: null,
            next_page : null,
            has_next: false,
            is_loading: false,
            is_animating_scrolling: false,
            modal: false,
            postId: 0,
            last_scrollTop: 0
        }
    },

    onPageScroll() {
        var bottomOffset = React.findDOMNode(this.refs.mansonryContainer).scrollHeight - window.innerHeight - this.state.scrollTop;
        if (bottomOffset < 300 && !this.state.is_loading && this.state.has_next) {
            this.setState({
                is_loading: true
            });
            this._getMorePosts(this.state.next_page);
        }
    },

    _getMorePosts(url) {
        this.getMorePosts(url, (error, response) => {
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
                
    _getPosts(categoryId, subcategoryId) {
        this.getPosts(categoryId, subcategoryId, (error, response) => {
            var new_elements = error ? [] : response.body.objects,
            next_page = response.body.meta.next, 
            has_next = response.body.meta.next != null;
            this.setState({
                posts: new_elements,
                next_page: next_page,
                has_next: has_next,
                is_loading: false,
            });
        });
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.categoryId != this.getParams().categoryId || this.state.subcategoryId != this.getParams().subcategoryId){
            // if category changes, start with a new list of posts
            this.setState({
                has_next: false,
                next_page: null,
                is_animating_scrolling: false,
                categoryId: this.getParams().categoryId,
                subcategoryId: this.getParams().subcategoryId,
                posts: [],
            });
            this._getPosts(this.getParams().categoryId, this.getParams().subcategoryId);
        }
    },
    /**
     * React component lifecycle method
     */
    componentDidMount() {
        this._getPosts(this.getParams().categoryId, this.getParams().subcategoryId);
        this.setState({
            categoryId: this.getParams().categoryId,
            subcategoryId: this.getParams().subcategoryId
        });
    },

    componentWillUpdate(nextProps, nextState) {
        if (this.state.posts && !this.state.is_animating_scrolling && this.getParams().categoryId) {
            this.setState({is_animating_scrolling: true})
            $.scrollTo('620px', 500);
        }; 
    },

    handleClick(post){
        this.setState({
            modal: true,
            postId: post.id,
            last_scrollTop: this.state.scrollTop
        });
        history.pushState(null, null, '/post/' + post.id + '/');
        $('.react-container').addClass('modal-open');
    },
    handleClickonCross() {
        this.setState({
            modal:false,
            postId: 0,
        });
        history.pushState(null, null, '/');
        $('.react-container').removeClass('modal-open'); 
        $.scrollTo(this.state.last_scrollTop, 500);
        this.setState({
            last_scrollTop: 0
        });
    },

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
                    category={post.category.name}
                    uri={post.resource_uri} 
                    onClick={this.handleClick.bind(this, post)} />
            );
        });
        var postModal;
        if (this.state.modal && this.state.postId > 0) {
            postModal = <PostPage key={this.state.postId} id={this.state.postId} onClickOnCross={this.handleClickonCross}/>;
        }
        return (
            <div>
                <div id="tiles" className="mansonryContainer" ref="mansonryContainer">
                    {PostTileNodes}
                </div>
                {postModal}
            </div>
        );
    }

});