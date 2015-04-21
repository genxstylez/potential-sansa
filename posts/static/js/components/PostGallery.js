'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

var SelectedImg = React.createClass({
    render() {
        return (
            <div className="on_deck">
                <span className="align-helper" />
                <img src={this.props.on_deck.img !== undefined ? this.props.on_deck.img.large : ''} />
            </div>
        )
    }  
});

var ImgRow = React.createClass({  
    render () {
        return (
            <ul className="images">
                {this.props.children}
            </ul>
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
        this.refs.imgRow.getDOMNode().scrollLeft -= 500;
    },
    handlerRightArrow() {
        this.refs.imgRow.getDOMNode().scrollLeft += 500;
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
            <SelectedImg key="selectedImg" on_deck={this.state.on_deck} />
            <div className="arrow left" onClick={this.handleLeftArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/left-arrow.png"} />
            </div>
            <ImgRow key="imgRow" ref="imgRow">
              {this.state.imgs.map(function(image) {
                  return (
                        <li>
                            <img key={image.id} src={image.img.small} 
                                onClick={this.handleClick.bind(this, image)} />
                        </li>
                  )
                }, this)}
            </ImgRow>
            <div className="arrow right" onClick={this.handlerRightArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/right-arrow.png"} />
            </div>
          </div>
        );
    }
});