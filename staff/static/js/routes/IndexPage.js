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
var Modal = require('react-modal');

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
            all_filter: true,
            adding: false,
            new_category: "",
            new_category_zh: "",
            selected_parent: null
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

    _createCategory(params) {
        this.createCategory(params, (error, response) => {
            if(!error) {
                this.toggleAddMode();
                this._getCategories();
            }
            $(React.findDOMNode(this.refs.SubmitButton)).button('loading');
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

    componentDidUpdate(prevProps, prevState) {
        $('[data-toggle="tooltip"]').tooltip()
    },

    handleClickNew() {
        this._createNewPost();
    },

    handleClickStarredButton(e) {
        React.findDOMNode(this.refs.starred).click()
    },

    handleClickStarred(bool) {
        this.setState({
            starred_filter: bool,
            all_filter: false
        });
    },

    handleClickPublished(bool) {
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

    toggleAddMode() {
        this.setState({
            adding: !this.state.adding
        });
    },

    handleChangeParent(e) {
        this.setState({
            selected_parent: e.target.value.replace('categories', 'admin_categories')
        });
    },

    handleChangeCategory(e) {
        this.setState({
            new_category: e.target.value
        });
    },

    handleKeyUpCategory(e) {
        if(e.key==='Enter')
            this.handleSubmitCategory();
    },

    handleChangeZhCategory(e) {
        this.setState({
            new_category_zh: e.target.value
        });
    },

    handleKeyUpZhCategory(e) {
        if(e.key==='Enter')
            this.handleSubmitCategory();
    },

    handleSubmitCategory(e) {
        e.preventDefault();
        $(React.findDOMNode(this.refs.SubmitButton)).button('loading');
        var params = {
            'parent': this.state.selected_parent,
            'name': this.state.new_category,
            'zh_name': this.state.new_category_zh
        }
        this._createCategory(params);
    },

    render() {
        const CategoryNodes = [];
        _.map(this.state.categories, category => {
            CategoryNodes.push(<Nav key={category.id} id={category.id} name={category.name} zh_name={category.zh_name} refreshCategory={this._getCategories} />);
            _.map(category.children, subcategory => {
                CategoryNodes.push(<Nav key={subcategory.id} parent_id={category.id} id={subcategory.id} zh_name={subcategory.zh_name} 
                        name={subcategory.name} isSub={true} 
                     refreshCategory={this._getCategories} /> )
            });
        });
        const PostNodes = _.map(this.state.posts, post => {
            return (
                <li key={post.id} className="list-group-item">
                    <Link to="post" params={{postId:post.id}}>{post.heading}</Link>
                    <span className="pull-right">
                        <ToggableIcon tooltip="加入至橫幅" style={{marginRight:"20px"}} className="glyphicon glyphicon-star-empty" name="starred" element_id={post.id} selected={post.starred} />
                        <ToggableIcon tooltip="發表" className="glyphicon glyphicon-ok" name="published" element_id={post.id} selected={post.published} />
                    </span>
                </li>
            );
        });
        return (
            <div style={{marginTop:"50px"}}>
                <div className="col-lg-4 col-md-4 col-sm-4 col-sm-4 navigation" ref="Navigation">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span style={{fontSize: "24px", margin: "0 auto" }} className="panel-title">Categories / 類別</span>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" type="button" onClick={this.toggleAddMode}>新類別</button>
                            </div>
                        </div>
                        <ul className="list-group">
                        <Link className="list-group-item" to="home">All</Link>
                            {CategoryNodes}
                        </ul>
                    </div>

                    <Link style={{position: "fixed", bottom: "20px", left: "20px"}} to="albums">
                        <button className="btn-lg btn-primary">免費圖庫</button>
                    </Link>
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
                                    <ToggableFilter selected={this.state.published_filter} className="glyphicon glyphicon-ok" ref="published" onStatus={this.handleClickPublished} />
                                </button>
                            </div>
                        </div>
                        <ul className="list-group">
                            {PostNodes}
                        </ul>
                    </div>
                </div>
                <Modal isOpen={this.state.adding} onRequestClose={this.toggleAddMode}>
                    <form className="form-horizontal" onSubmit={this.handleSubmitCategory} style={{margin: "20px auto", width: "80%"}}>
                        <div className="form-group">
                            <label>主類別</label>
                            <select className="form-control" name="parent_category" onChange={this.handleChangeParent}>
                                <option>無</option>
                                {this.state.categories.map(category => {
                                    return(
                                        <option value={category.resource_uri}>{category.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>類別名稱 (英)</label>
                            <input className="form-control" type="text" onKeyUp={this.handleKeyUpCategory} onChange={this.handleChangeCategory} 
                                    value={this.state.new_category} />
                        </div>
                        <div className="form-group">
                            <label>類別名稱 (中)</label>
                            <input className="form-control" type="text" onKeyUp={this.handleKeyUpZhCategory} onChange={this.handleChangeZhCategory} 
                                    value={this.state.new_category_zh} />
                        </div>  
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" ref="SubmitButton" data-loading-text="儲存中..." style={{marginRight: "10px"}}>儲存</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

});