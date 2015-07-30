'use strict';

import React from 'react/addons';
import _ from 'lodash';
import classNames from 'classnames';
var Navigation = require('react-router').Navigation;
import PostCredit from '../PostCredit';
import ShootingCredit from './ShootingCredit';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

function generate_embed(youtube_id) {
    var width = $('.shooting_deck').width() * 0.9;
    var height = width / 1.5;

    return '<iframe width="' + width + '" height="' + height + '" ' +
            'src="https://www.youtube.com/embed/' + youtube_id + '" ' +
            'frameborder="0" allowfullscreen></iframe>';
};

export default React.createClass({
    mixins : [Navigation],

    getInitialState() {
        return {
            show_credits: false,
            current_image: null,
            current_index: 0
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


    handleClickOnToggle() {
        this.setState({
            show_credits: !this.state.show_credits
        });
    },

    componentDidMount() {
        this.setState({
            current_image: this.props.imgs[0]
        });
    },

    handleLeftArrow(e) {
        e.preventDefault();
        var index = this.state.current_index == 0 ? this.props.imgs.length - 1 : this.state.current_index - 1
        this.setState({
            current_index: index,
            current_image: this.props.imgs[index]
        });
    },

    handlerRightArrow(e) {
        e.preventDefault();
        var index = this.state.current_index == this.props.imgs.length - 1 ? 0 : this.state.current_index + 1
        this.setState({
            current_index: index,
            current_image: this.props.imgs[index]
        });
    },


    render() {
        var info_class = classNames({
            out: !this.state.show_credits,
            "shooting-info": true
        });
        const creditNodes = _.map(this.props.credits, credit => {
                return (
                    <ShootingCredit key={credit.id} role={credit.role} name={credit.name}/>
                );
            });
        var ImgNode = "";
        if(this.state.current_image != null)
            if(this.state.current_image.video_id) 
                ImgNode = <span key={this.state.current_image.id}>
                        <div className="video-embed" dangerouslySetInnerHTML={{__html: generate_embed(this.state.current_image.video_id)}} />
                    </span>
            else
               ImgNode = <span key={this.state.current_image.id}>
                        <img src={this.state.current_image.img.xxl} />
                        <span className="align-helper" />
                    </span>

        return (
            <div className="article-box" ref="articleBox">
                <img className="shooting-info-toggle" src={STATIC_URL + "img/info.png"} onClick={this.handleClickOnToggle} />
                <div className={info_class}>
                    <span className="close">
                        <img src={STATIC_URL + "img/cross.png"} onClick={this.handleClickOnToggle} />
                    </span>
                    <div style={{margin: "120px 30px"}}>
                        {creditNodes}
                    </div>
                </div>
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.props.onClickOnCross} />
                </span>
                <div className="row article-header">
                    <span className="circle-divider"></span>
                    {this.props.category}
                    <span className="circle-divider"></span>
                </div>
                <div className="row article">
                    <div className="shooting_deck">
                        <TransitionGroup transitionName="shooting-gallery" transitionLeave={false}>
                            {ImgNode}
                        </TransitionGroup>
                        <div className="shooting-info-heading">{this.props.heading}</div>
                        <a href="#" onClick={this.handleLeftArrow}><img className="arrow left" src={STATIC_URL + "img/banner-left.png"} /></a>
                        <a href="#" onClick={this.handlerRightArrow}><img className="arrow right" src={STATIC_URL + "img/banner-right.png"} /></a>
                    </div>
                    <div className="triangle"></div>
                </div>
            </div>
        );
    }
});