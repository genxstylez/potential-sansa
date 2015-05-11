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
            <div className="row banner-outer-container">
                <img className="arrow left" onClick={this.handleLeftArrow} src={STATIC_URL + "img/banner-left.png"} />
                <img className="arrow right" src={STATIC_URL + "img/banner-right.png"} onClick={this.handlerRightArrow} />
                <div ref="bannerContainer">
                    <div className="banner-inner-container" ref="InnerContainer">
                        {tileNodes}
                    </div>
                </div>
            </div>
        );
    }
});