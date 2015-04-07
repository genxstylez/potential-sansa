'use strict';

import React from 'react';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import BannerTile from './BannerTile';


const Link = Router.Link;

export default React.createClass({
    mixins: [WebAPIMixin],
    pollInterval: 60000,
    posts: [],

    contextTypes: {
        router: React.PropTypes.func
    },
     _getStarred() {
        this.getStarred((error, response) => {
            this.posts = error ? [] : response.body.objects;
            this.forceUpdate();
        });
    },
    componentDidMount() {
        this._getStarred();
         this.interval = setInterval(() => {
            this._getStarred();
        }, this.pollInterval);
        $('.banner-outer-container').scrollbar({
            horizontal: true
        });
    },
    componentWillUnmount() {
        if (_.has(this, 'interval')) {
            clearInterval(this.interval);
        }
    },
    render() {
        const tileNodes = _.map(this.posts, post => {
            return (
                <BannerTile 
                    key={post.id} 
                    id={post.id} 
                    zh_title={post.zh_title}
                    en_title={post.en_title}
                    cover={post.cover[0]} />
            );
        });
        return (
            <div className="row banner-outer-container fs-scrollbar-active" ref="bannerContainer">
                <div className="banner-inner-container">
                    {tileNodes}
                </div>
            </div>
        );
    }
});