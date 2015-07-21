'use strict';

import React from 'react/addons';
import Router from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';
import APIMixin from '../mixins/APIMixin';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import Nav from '../components/Nav';

const Link = Router.Link;

export default React.createClass({
    mixins: [APIMixin, ScrollListenerMixin, Router.State],

    getInitialState() {
        return ({
            post: null,
            posts: [],
            categories: [],
            categoryId: 0,
            subcategoryId: 0,
            next_page: null,
            has_next: false,
            is_loading: false
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

    _getPosts(categoryId, subcategoryId) {
        var category = _.find(this.state.categories, {id: parseInt(categoryId)})
        if(_.has(category, 'children')) {
            if(category.children.length == 0) {
                subcategoryId = categoryId;
                categoryId = null;
            }
        }
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
            });
            this._getPosts(this.getParams().categoryId, this.getParams().subcategoryId);
        }
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
                <Link key={post.id} className="list-group-item" to="post" params={{postId:post.id}}>{post.heading}</Link>
            );
        });
        return (
            <div style={{marginTop:"50px"}}>
                <div className="col-lg-4 col-md-4 col-sm-4 col-sm-4 navigation" ref="Navigation">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Categories / 類別</h3>
                        </div>
                        <ul className="list-group">
                            {CategoryNodes}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 posts" ref="Posts">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Posts / 文章</h3>
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