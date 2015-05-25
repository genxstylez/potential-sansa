'use strict';

import React from 'react/addons';
import _ from 'lodash';
var Navigation = require('react-router').Navigation;
import PostCredit from '../PostCredit';
import ShootingGallery from './ShootingGallery';

export default React.createClass({
    mixins : [Navigation],

    getInitialState() {
        return {
            show_credits: false
        }
    },
    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string,
        imgs: React.PropTypes.array.isRequired,
        credits: React.PropTypes.array,
        created_at: React.PropTypes.string,
        last_modified: React.PropTypes.string,
    },

    handeClickOnCross() {
       if(!this.goBack()) {
            this.transitionTo('/')
       }
    },

    handleClickOnToggle() {
        this.setState({
            show_credits: true
        });
    },
    render() {
        var cover = {};
        if (this.props.imgs.length > 0)
            cover = this.props.imgs[0];
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
                    <ShootingGallery 
                        imgs={this.props.imgs} 
                        on_deck={cover} 
                        credits={this.props.credits}
                        show_credits={this.state.show_credits} />
                    <div className="shooting-info">
                        <span className="shooting-info-heading">{this.props.heading}</span>
                        <span className="shooting-info-toggle" onClick={this.handleClickOnToggle}>Info</span>
                    </div>
                    <div className="triangle"></div>
                </div>
            </div>
        );
    }
});