'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

const Link = Router.Link;

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    mixins: [WebAPIMixin],

    propTypes: {
        id: React.PropTypes.string.isRequired,
    },

    getInitialState() {
        return {
            id: '',
            heading: '',
            subheading: '',
            articletext: '',
            imgs: [],
            credits: [],
            created_at: '',
            last_modified: '',
            uri: '',
        }
    },
    _getPost(Id) {
        this.getPost(Id, (error, response) => {
            var post = error ? [] : response.body;
            this.setState({
                id: post.id,
                heading: post.heading,
                subheading: post.subheading,
                articletext: post.articletext,
                imgs: post.images,
                credits: post.credits,
                created_at: post.created_at,
                last_modified: post.last_modified,
                category: post.category.name,
                uri: post.resource_uri
            });
        });
    },
    componentDidMount() {
        this._getPost(this.props.id);
    },

    componentWillUpdate(nextProps, nextState) {
        if(this.isMounted()) {
            setTimeout(() => {
                $(this.refs.articleContent.getDOMNode()).jScrollPane();
            }, 50);
        }
    },

    handeClickOnCross() {
       if(!this.context.router.goBack()) {
            this.context.router.transitionTo('/')
       }
    },

    render() {
        var cover = {};
        for (var i=0; i < this.state.imgs.length; i++) {
            if(this.state.imgs[i].is_cover==true)
                cover = this.state.imgs[i];
        };
        const creditNodes = _.map(this.state.credits, (value, key) => {
            return (
                <PostCredit role={key} names={value}/>
            );
        });

        var cross_icon = STATIC_URL + "img/cross.png";
        var fb_icon = STATIC_URL + "img/fb.png";
        return (
            <div className="article-box" ref="articleBox">
                <span className="close">
                    <img src={cross_icon} onClick={this.handeClickOnCross} />
                </span>
                <div className="row article-header">
                    <span className="circle-divider"></span>
                    {this.state.category}
                    <span className="circle-divider"></span>
                </div>
                <div className="row article">
                    <div className="pull-left article-content" ref="articleContent">
                        <div className="inner-content">
                            <span className="label category">{this.state.category}</span>
                            <p className="title">{this.state.heading}</p>
                            <p className="sub-title">{this.state.subheading}</p>
                            <div className="decorations">
                                <span className="created_at">{new Date(this.state.created_at).toDateString()}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: this.state.articletext}} />
                            <div className="decorations end"></div>
                            {creditNodes}
                            <div className="share">
                                <a href="http://facebook.com">
                                    <img src={fb_icon} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <PostGallery imgs={this.state.imgs} on_deck={cover}/>
                    <div className="triangle"></div>
                </div>
            </div>
        );
    }
});