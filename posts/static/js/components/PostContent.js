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

    componentDidMount() {
        this.getPost(this.props.id, (error, response) => {
            var post = error ? [] : response.body;
            if(this.isMounted()) {
                this.setState({
                    id: post.id,
                    zh_title: post.zh_title,
                    en_title: post.en_title,
                    content: post.content,
                    imgs: post.images,
                    credits: post.credits,
                    created_at: post.created_at,
                    last_modified: post.last_modified,
                    category: post.category.name,
                    uri: post.resource_uri
                });
            };
        });
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
        const creditNodes = _.map(this.state.credits, credit => {
            return (
                <PostCredit
                    key={credit.id}
                    id={credit.id}
                    role={credit.role}
                    name={credit.name}/>
            );
        });
        return (
            <div className="modal">
                <span className="close">
                    <img src="/static/img/cross.png" onClick={this.handeClickOnCross}></img>
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
                        <div className="pull-left content">
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
                                    <img src="/static/img/fb.png" />
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