'use strict';

import React from 'react/addons';
import Router from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';
import APIMixin from '../mixins/APIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import Nav from '../components/Nav';
import ToggableFilter from '../components/ToggableFilter';
import ToggableIcon from '../components/ToggableIcon';

const Link = Router.Link;

export default React.createClass({
    mixins: [APIMixin, ScrollListenerMixin, Router.State, Router.Navigation],

    getInitialState() {
        return ({
            post: null,
            posts: [],
            categories: [],
            categoryId: 0,
            subcategoryId: 0,
            next_page: null,
            has_next: false,
            is_loading: false,
            starred_filter: false,
            published_filter: false,
            all_filter: true
        });
    },
    onPageScroll() {
        var bottomOffset = React.findDOMNode(this.refs.Posts).scrollHeight - window.innerHeight - this.state.scrollTop;
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
    _getCategories() {
        this.getCategories((error, response) => {
            this.setState({ categories: error ? [] : response.body.objects });
            this._getPosts(this.getParams().categoryId, this.getParams().subcategoryId);
        });
    },

    _getPosts(categoryId, subcategoryId, query) {
        var category = _.find(this.state.categories, {id: parseInt(categoryId)})
        if(_.has(category, 'children')) {
            if(category.children.length == 0) {
                subcategoryId = categoryId;
                categoryId = null;
            }
        }
        this.getPosts(categoryId, subcategoryId, query, (error, response) => {
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

    _createNewPost() {
        var category_uri = "/staff_api/v1/admin_categories/";
        if (this.state.subcategoryId)
            category_uri += this.state.subcategoryId + "/";
        else
            if (this.state.categoryId)
                category_uri += this.state.categoryId + "/";
            else
                category_uri += this.state.categories[0].id + "/";

        var params = {
            heading: "Heading",
            subheading: "Subheading",
            articletext: "Content",
            category: category_uri
        };
        this.createPost(params, (error, response) => {
            if(!error)
                var post_id = response.headers['location'].split('/')[6]
                this.transitionTo("post", params={postId: post_id});
        });
    },

    componentDidMount() {
        this._getCategories();
        this.setState({
            categoryId: this.getParams().categoryId,
            subcategoryId: this.getParams().subcategoryId
        });
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.categoryId != this.getParams().categoryId || this.state.subcategoryId != this.getParams().subcategoryId){
            // if category changes, start with a new list of posts
            this.setState({
                has_next: false,
                next_page: null,
                categoryId: this.getParams().categoryId,
                subcategoryId: this.getParams().subcategoryId,
                posts: [],
                all_filter: true,
                starred_filter: false,
                published_filter: false
            });
            this._getPosts(this.getParams().categoryId, this.getParams().subcategoryId);
        }
    },

    componentWillUpdate(nextProps, nextState) {
        if(nextState.all_filter == this.state.all_filter &&
                nextState.published_filter != this.state.published_filter || nextState.starred_filter != this.state.starred_filter) {
            this._getPosts(this.state.categoryId, 
                this.state.subcategoryId, 'starred=' + nextState.starred_filter + '&published=' + nextState.published_filter);
        } 
    },

    handleClickNew() {
        this._createNewPost();
    },

    handleClickStarredButton() {
        React.findDOMNode(this.refs.starred).click()
    },

    handleClickStarred(bool) {
        this.setState({
            starred_filter: bool,
            all_filter: false
        });
    },

    handleClickPublised(bool) {
        this.setState({
            published_filter: bool,
            all_filter: false
        });
    },

    handleClickAll() {
        this.setState({
            all_filter: !this.state.all_filter,
            starred_filter: false,
            published_filter: false
        });
         this._getPosts(this.state.categoryId, this.state.subcategoryId);
    },

    handleClickPublishedButton() {
        React.findDOMNode(this.refs.published).click()
    },

    render() {
        const CategoryNodes = [];
        _.map(this.state.categories, category => {
            CategoryNodes.push(<Nav key={category.id} id={category.id} name={category.name} />);
            _.map(category.children, subcategory => {
                CategoryNodes.push(<Nav key={subcategory.id} parent_id={category.id} id={subcategory.id} name={subcategory.name} isSub={true} /> )
            });
        });
        const PostNodes = _.map(this.state.posts, post => {
            return (
                <Link key={post.id} className="list-group-item" to="post" params={{postId:post.id}}>
                    {post.heading}
                    <span className="pull-right">
                        <ToggableIcon tooltip="加入至橫幅" style={{marginRight:"20px"}} className="glyphicon glyphicon-star-empty" name="starred" element_id={post.id} selected={post.starred} />
                        <ToggableIcon tooltip="發表" className="glyphicon glyphicon-ok" name="published" element_id={post.id} selected={post.published} />
                    </span>
                </Link>
            );
        });
        return (
            <div style={{marginTop:"50px"}}>
                <div className="col-lg-4 col-md-4 col-sm-4 col-sm-4 navigation" ref="Navigation">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 style={{fontSize: "24px"}} className="panel-title">Categories / 類別</h3>
                        </div>
                        <ul className="list-group">
                        <Link className="list-group-item" to="home">All</Link>
                            {CategoryNodes}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 posts" ref="Posts">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span style={{fontSize: "24px", margin: "0 auto" }} className="panel-title">Posts / 文章</span>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" type="button" onClick={this.handleClickNew}>新文章</button>
                                <button className={this.state.all_filter ? "btn btn-info" : "btn btn-default"} type="button" onClick={this.handleClickAll}>All</button>
                                <button className="btn btn-default" type="button" onClick={this.handleClickStarredButton}>
                                    <ToggableFilter selected={this.state.starred_filter} className="glyphicon glyphicon-star-empty" ref="starred" onStatus={this.handleClickStarred} />
                                </button>
                                <button className="btn btn-default" type="button" onClick={this.handleClickPublishedButton}>
                                    <ToggableFilter selected={this.state.published_filter} className="glyphicon glyphicon-ok" ref="published" onStatus={this.handleClickPublised} />
                                </button>
                            </div>
                        </div>
                        <ul className="list-group">
                            {PostNodes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});