'use strict';

import React from 'react/addons';
import _ from 'lodash';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';
var Navigation = require('react-router').Navigation;

export default React.createClass({
    mixins: [Navigation],

    contextTypes: {
        router: React.PropTypes.func
    },

    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string,
        imgs: React.PropTypes.array.isRequired,
        credits: React.PropTypes.object,
        created_at: React.PropTypes.string,
        last_modified: React.PropTypes.string,
    },


    componentDidMount() {
    },

    componentWillUpdate(nextProps, nextState) {
        if(this.isMounted()) {
            setTimeout(() => {
                $(React.findDOMNode(this.refs.articleContent)).jScrollPane();
            }, 50);
        }
    },

    handeClickOnCross() {
       if(!this.goBack()) {
            this.transitionTo('/')
       }
    },

    render() {
        var cover = {};
        for (var i=0; i < this.props.imgs.length; i++) {
            if(this.props.imgs[i].is_cover==true)
                cover = this.props.imgs[i];
        };
        const creditNodes = _.map(this.props.credits, (value, key) => {
            return (
                <PostCredit role={key} names={value}/>
            );
        });

        return (
            <div className="article-box" ref="articleBox">
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                </span>
                <div className="row article-header">
                    <span className="circle-divider"></span>
                    {this.props.category}
                    <span className="circle-divider"></span>
                </div>
                <div className="row article">
                    <div className="pull-left article-content" ref="articleContent">
                        <div className="inner-content">
                            <span className="label category">{this.props.category}</span>
                            <p className="title">{this.props.heading}</p>
                            <p className="sub-title">{this.props.subheading}</p>
                            <div className="decorations">
                                <span className="created_at">{new Date(this.props.created_at).toDateString()}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: this.props.articletext}} />
                            <div className="decorations end"></div>
                            {creditNodes}
                            <div className="share">
                                <a href="http://facebook.com">
                                    <img src={STATIC_URL + "img/fb.png"} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <PostGallery imgs={this.props.imgs} on_deck={cover}/>
                    <div className="triangle"></div>
                </div>
            </div>
        );
    }
});