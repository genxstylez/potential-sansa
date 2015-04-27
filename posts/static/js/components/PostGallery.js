'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');


const Link = Router.Link;

var SelectedImg = React.createClass({
    render() {
        return (
            <div className="on_deck">
                <span className="align-helper" />
                <img src={this.props.on_deck.img !== undefined ? this.props.on_deck.img.large : ''} />
                <div className="caption">{this.props.on_deck.caption}</div>
            </div>
        )
    }  
});

export default React.createClass({
    propTypes: {
        on_deck: React.PropTypes.object.isRequired,
        imgs: React.PropTypes.array.isRequired,
    },
    componentWillReceiveProps(nextProps) {
        if(this.isMounted()) {
            this.setState({
                on_deck: nextProps.on_deck,
                imgs: nextProps.imgs,
            })
        };
        this.forceUpdate();
    },
    handleClick(image_url) {
        this.setState({on_deck: image_url});
    },
    handleLeftArrow() {
        $(this.refs.imgRow.getDOMNode()).animate({ 
            scrollLeft: "-=250"
        }, 200);
    },
    handlerRightArrow() {
          $(this.refs.imgRow.getDOMNode()).animate({ 
            scrollLeft: "+=250"
        }, 200);
    },
    getInitialState() {
        return {
            on_deck: this.props.on_deck,
            imgs: this.props.imgs
        }
    },
    render() {
        return (
          <div className="pull-right gallery">
            <TransitionGroup transitionName="gallery">
                <SelectedImg key={this.state.on_deck.id} on_deck={this.state.on_deck} />
            </TransitionGroup>
            <div className="arrow left" onClick={this.handleLeftArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/left-arrow.png"} />
            </div>
            <ul className="images" ref="imgRow">
              {this.state.imgs.map(function(image) {
                  return (
                        <li>
                            <img key={image.id} src={image.img.small} 
                                onClick={this.handleClick.bind(this, image)} />
                        </li>
                  )
                }, this)}
            </ul>
            <div className="arrow right" onClick={this.handlerRightArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/right-arrow.png"} />
            </div>
          </div>
        );
    }
});