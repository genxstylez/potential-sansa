'use strict';

import React from 'react/addons';
import _ from 'lodash';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var SelectedImg = React.createClass({
    render() {
        var onDeckNode = this.props.on_deck.video ? 
            <div className="video-embed" dangerouslySetInnerHTML={{__html: this.props.on_deck.video}} /> :  
            [<span className="align-helper" />,
            <img src={this.props.on_deck.img !== undefined ? this.props.on_deck.img.large : ''} />]
        return (
            <div className="on_deck">
                {onDeckNode}
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
        $(React.findDOMNode(this.refs.imgRow)).animate({ 
            scrollLeft: "-=250"
        }, 200);
    },
    handlerRightArrow() {
          $(React.findDOMNode(this.refs.imgRow)).animate({ 
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
                    if (image.video) {
                        return (
                            <li key={image.id}>
                                <img src={"https://i.ytimg.com/vi/" + image.video_id + "/hqdefault.jpg"}
                                    onClick={this.handleClick.bind(this, image)} />
                            </li>
                        )
                    } else {
                        return (
                            <li key={image.id}>
                                <img src={image.img.small} 
                                    onClick={this.handleClick.bind(this, image)} />
                            </li>
                        )
                    }
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