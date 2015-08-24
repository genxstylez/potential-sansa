'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import MansonryMixin from 'react-masonry-mixin';
import PostTile from './Post/PostTile';
import PostPage from '../routes/PostPage';

const mansonryOptions = {
    transitionDuration: 0
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin],

    propTypes: {
        query : React.PropTypes.string
    },

    getInitialState() {
        return {
            posts: [],
            next_page : null,
            has_next: false,
            is_loading: false,
            modal: false
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
                posts: [],
            });
            this._getSearchPosts(null, nextProps.query);
        }
        this.setState({
            modal:false
        });
        $('.react-container').removeClass('modal-open');

    },
    componentDidMount() {
        this._getSearchPosts(null, this.props.query);
        setTimeout( () => {
            $.scrollTo('620px', 500);
        }, 50);
    },

    componentWillUpdate(nextProps, nextState) {
        if(nextState.posts != this.state.posts)
            setTimeout(() => {
                $.scrollTo('620px', 500);
            }, 50)
    },

    handleClick(post){
        this.setState({
            modal: true,
            postId: post.id,
            last_scrollTop: this.state.scrollTop
        });
        history.pushState(null, "O'logy" + post.heading, '/post/' + post.id + '/');
        ga('send', 'pageview', {'page': '/post/' + post.id + '/', 'title': post.heading});
        $('.react-container').addClass('modal-open');
    },
    handleClickonCross() {
        this.setState({
            modal:false,
            postId: 0,
        });
        history.back();
        ga('send', 'pageview', {'page': '/'});
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
                    onClick={this.handleClick.bind(this, post)} />
            );
        });
        var results_string = this.state.posts.length > 0 ? "Results for " : "No results found for " ;
        var postModal;
        if (this.state.modal && this.state.postId > 0) {
            postModal = <PostPage key={this.state.postId} id={this.state.postId} onClickOnCross={this.handleClickonCross}/>;
        }
        return (
            <div>
                <div className="no-results" style={{display: this.state.modal ? "none" : "block"}}>
                    <span className="circle-divider" />
                    {results_string + this.props.query} 
                    <span className="circle-divider" />
                </div>
                <div id="tiles"className="mansonryContainer" ref="mansonryContainer">
                    {PostTileNodes}
                </div>
                {{ postModal }}
            </div>
        );
    }

});