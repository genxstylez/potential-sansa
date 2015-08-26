'use strict';

import React from 'react/addons';
import _ from 'lodash';
import classNames from 'classnames';
var Navigation = require('react-router').Navigation;
import PostCredit from '../PostCredit';
import ShootingCredit from './ShootingCredit';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Modal = require('react-modal');

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
            current_image: {id: 'initial_id'},
            current_index: 0,
            show_image: false
        }
    },
    propTypes: {
        id: React.PropTypes.number.isRequired,
        is_select: React.PropTypes.bool.isRequired,
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

    toggleImageMode() {
        this.setState({
            show_image: !this.state.show_image
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

    enterOverlay(e) {
        if(this.props.is_select) {
            var width = $('#CurrentImg img').width();
            $('.overlay_text').css('width', width + 'px');
            var bottom = $('.overlay_text').outerHeight();
            $('.overlay_text').css({bottom: bottom - 1 + 'px'});
            $('.overlay_text').animate({'opacity': 1});
        }
    },

    leaveOverlay(e) {
        if(this.props.is_select)
            $('.overlay_text').animate({'opacity': 0});
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
        var ImgNode = this.state.current_image.video_id ?
                <div className="video-embed" dangerouslySetInnerHTML={{__html: generate_embed(this.state.current_image.video_id)}} /> :
                <img onClick={this.toggleImageMode}
                    onMouseEnter={this.enterOverlay}
                    src={this.state.current_image.img !== undefined ? this.state.current_image.img.xxl: ''} />
        return (
            <div className="article-box" ref="articleBox">
                <img className="shooting-info-toggle" src={STATIC_URL + "img/info.png"} onClick={this.handleClickOnToggle} />
                <div className={info_class}>
                    <span className="close">
                        <img src={STATIC_URL + "img/wcross.png"} onClick={this.handleClickOnToggle} />
                    </span>
                    <div style={{margin: "120px 30px"}}>
                        <div style={{overflow: "hidden"}} dangerouslySetInnerHTML={{__html: this.props.articletext}} />
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
                        <TransitionGroup transitionName="gallery" transitionLeave={false}>
                            <div className="inner_deck" key={this.state.current_image.id}>
                                <div id="CurrentImg">
                                    {ImgNode}
                                    <div onMouseLeave={this.leaveOverlay}
                                        className="overlay_text"
                                        dangerouslySetInnerHTML={{__html: this.state.current_image != undefined ? this.state.current_image.select_text: ""}} />
                                </div>
                                <span className="align-helper" />
                            </div>
                        </TransitionGroup>
                        <div className="shooting-info-heading">{this.props.heading}</div>
                        <a href="#" onClick={this.handleLeftArrow}><img className="arrow left" src={STATIC_URL + "img/banner-left.png"} /></a>
                        <a href="#" onClick={this.handlerRightArrow}><img className="arrow right" src={STATIC_URL + "img/banner-right.png"} /></a>
                    </div>
                    <div className="triangle"></div>
                </div>
                <Modal isOpen={this.state.show_image} onRequestClose={this.toggleImageMode} overlayClassName="imageModal" className="imageContent">
                    <span className="close" onClick={this.toggleImageMode}>
                        <img src={STATIC_URL + "img/circle-cross.png"} />
                    </span>
                    <img src={_.has(this.state.current_image, 'img') ? 
                        _.has(this.state.current_image.img, 'original') ? this.state.current_image.img.original : ''
                        : ''} />
                    <span className="align-helper" />
                </Modal>
            </div>
        );
    }
});