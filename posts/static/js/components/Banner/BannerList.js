'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import PostPage from '../../routes/PostPage';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import BannerTile from './BannerTile';

export default React.createClass({
    mixins: [WebAPIMixin],

    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            posts: [],
            modal: false,
            postId: 0,
        }
    },
    _getStarred() {
        this.getStarred((error, response) => {
            this.setState({posts: error ? [] : response.body.objects});
        });
    },
    componentDidMount() {
        this._getStarred();
        if(this.isMounted()) {
            setTimeout(() => {
                $(React.findDOMNode(this.refs.bannerContainer)).scrollbar({
                    horizontal: true
                });
            }, 50);
        }
    },
    componentDidUpdate(prevProps, prevState){
        setTimeout(() => {
            $(React.findDOMNode(this.refs.bannerContainer)).scrollbar("resize");
        }, 100);
    },
    handleLeftArrow() {
        $('.fs-scrollbar-content').animate({ 
            scrollLeft: "-=1280"
        }, 200);
    },
    handlerRightArrow() {
        $('.fs-scrollbar-content').animate({ 
            scrollLeft: "+=1280"
        }, 200);
    },
    handleOnClick(post) {
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
        history.pushState(null, "O'logy", '/');
        ga('send', 'pageview', {'page': '/'});
        $('.react-container').removeClass('modal-open'); 
        $.scrollTo(this.state.last_scrollTop, 500);
        this.setState({
            last_scrollTop: 0
        });
    },

    render() {
        const tileNodes = _.map(this.state.posts, post => {
            return (
                <BannerTile 
                    key={post.id} 
                    id={post.id} 
                    heading={post.heading}
                    subheading={post.subheading}
                    cover={post.cover} 
                    onClick={this.handleOnClick.bind(this, post)} />
            );
        });
        var postModal;
        if (this.state.modal && this.state.postId > 0) {
            postModal = <PostPage key={this.state.postId} id={this.state.postId} onClickOnCross={this.handleClickonCross}/>;
        }
        return (
            <div className="row banner-outer-container">
                <img className="arrow left" onClick={this.handleLeftArrow} src={STATIC_URL + "img/banner-left.png"} />
                <img className="arrow right" src={STATIC_URL + "img/banner-right.png"} onClick={this.handlerRightArrow} />
                <div ref="bannerContainer">
                    <div className="banner-inner-container" ref="InnerContainer">
                        {tileNodes}
                    </div>
                </div>
                {postModal}
            </div>
        );
    }
});