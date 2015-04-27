'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import BannerTile from './BannerTile';


const Link = Router.Link;

export default React.createClass({
    mixins: [WebAPIMixin],

    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            posts: []
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
                $(this.refs.bannerContainer.getDOMNode()).scrollbar({
                    horizontal: true
                });
            }, 50);
        }
    },
    componentDidUpdate(prevProps, prevState){
        setTimeout(() => {
            $(this.refs.bannerContainer.getDOMNode()).scrollbar("resize");
        }, 100);
    },
    componentWillUnmount() {},
    render() {
        const tileNodes = _.map(this.state.posts, post => {
            return (
                <BannerTile 
                    key={post.id} 
                    id={post.id} 
                    heading={post.heading}
                    subheading={post.subheading}
                    cover={post.cover[0]} />
            );
        });
        return (
            <div className="row banner-outer-container" ref="bannerContainer">
                <div className="banner-inner-container">
                    {tileNodes}
                </div>
            </div>
        );
    }
});