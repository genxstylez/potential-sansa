'use strict';

import React from 'react/addons';
import _ from 'lodash';
import classNames from 'classnames';
import PhotoFooter from './PhotoFooter';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Navigation = require('react-router').Navigation;

export default React.createClass({
    mixins: [Navigation],

    getInitialState() {
        return ({
            current_photo: undefined
        });
    },

    handleClickOnThumbnail(index) {
        $('.myslick-container').slick('slickGoTo', index);
    },
    handleClickOnPhoto(photo) {
        this.setState({
            current_photo: photo
        });
    },
    handeClickOnPhotoCross() {
        this.setState({
            current_photo: undefined
        });
    },
    handeClickOnCross() {
        if(!this.goBack())
            this.transitionTo('albums');
    },
    handleLeftArrow() {
        $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "-=350"
        }, 200);
    },
    handlerRightArrow() {
          $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "+=350"
        }, 200);
    },
    componentDidMount() {
        if(this.isMounted()) {
            $('.myslick-container').slick({
                centerMode: true,
                slidesToShow: 1,
                variableWidth: true,
                speed: 300,
                inifinite: true,
                prevArrow: '<button type="button" class="myslick-prev"><img src="' + STATIC_URL + 'img/banner-left.png" /></button>',
                nextArrow: '<button type="button" class="myslick-next"><img src="' + STATIC_URL + 'img/banner-right.png" /></button>'
            });
        }
    },

    render() {
        const ImageNodes = _.map(this.props.photos, photo => {
            return (
                <div key={photo.id}>
                    <span className="align-helper" />
                    <img src={photo.img.large} 
                        onClick={this.handleClickOnPhoto.bind(this, photo)} />
                    <div className="caption">{photo.caption}</div>
                </div>
            );
        });
        const thumbnailNodes = _.map(this.props.photos, (photo, index) => {
            return (
                <li key={photo.id}>
                    <img src={photo.img.small} 
                        onClick={this.handleClickOnThumbnail.bind(this, index)} />
                </li>
            );
        });
        var PhotoNode = "";
        if(this.state.current_photo) {
            PhotoNode = <div className="photo-layer" key={this.state.current_photo.id}>
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnPhotoCross} />
                </span>
                <div className="caption">{this.state.current_photo.caption}</div>
                <div className="photo-content">
                    <span className="align-helper" />
                    <img src={this.state.current_photo.img.original} />
                </div>
                <PhotoFooter collapsed={true} photo={this.state.current_photo} />
            </div>
        }

        return (
            <div className="album-content">
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                </span>
                <div className="albums-header">
                    <span className="circle-divider" />
                    {this.props.name}
                    <span className="circle-divider" />
                </div>

                <div className="myslick-container">
                    {ImageNodes} 
                </div>

                <div className="thumbnails-div">
                    <div className="arrow pull-left" onClick={this.handleLeftArrow}>
                        <span className="align-helper" />
                        <img src={STATIC_URL + "img/left-arrow.png"} />
                    </div>
                    <ul className="thumbnails" ref="thumbnailsRow">
                        {thumbnailNodes}
                    </ul>
                    <div className="arrow pull-left right" onClick={this.handlerRightArrow}>
                        <span className="align-helper" />
                        <img src={STATIC_URL + "img/right-arrow.png"} />
                    </div>
                </div>
                <TransitionGroup transitionName="post">
                    {PhotoNode}
                </TransitionGroup>
            </div>
        );
    }
});