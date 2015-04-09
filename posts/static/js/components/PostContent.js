'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';


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
            zh_title: '',
            en_title: '',
            content: '',
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
                zh_title: post.zh_title,
                en_title: post.en_title,
                content: post.articletext,
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

    componentDidUpdate(prevProps, prevState) {},

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
        const creditNodes = _.map(this.state.credits, credit => {
            return (
                <PostCredit
                    key={credit.id}
                    id={credit.id}
                    role={credit.role}
                    name={credit.name}/>
            );
        });

        var cross_icon = STATIC_URL + "img/cross.png";
        var fb_icon = STATIC_URL + "img/fb.png";
        return (
            <div className="modal">
                <span className="close">
                    <img src={cross_icon} onClick={this.handeClickOnCross} />
                </span>
                <div className="row">
                    <div className="modal-header">
                        <span className="circle-divider"></span>
                        {this.state.category}
                        <span className="circle-divider"></span>
                    </div>
                </div>
                <div className="row">
                    <div className="modal-content">
                        <div className="pull-left content" ref="contentContainer">
                            <p className="title">{this.state.zh_title}</p>
                            <p className="sub-title">{this.state.en_title}</p>
                            <div className="decorations">
                                <span className="twin circle-divider"></span>
                                <span className="twin circle-divider"></span>
                                <span className="pull-right created_at">{new Date(this.state.created_at).toDateString()}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                            <div className="decorations end">
                                <span className="twin circle-divider grey-circle"></span>
                                <span className="twin circle-divider grey-circle"></span>
                            </div>
                            {creditNodes}
                            <div className="share">
                                <a href="http://facebook.com">
                                    <img src={fb_icon} />
                                </a>
                            </div>
                        </div>
                        <PostGallery imgs={this.state.imgs} on_deck={cover}/>
                        <div className="triangle"></div>
                    </div>
                </div>
            </div>
        );
    }
});