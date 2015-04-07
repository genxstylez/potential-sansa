'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

var SelectedImg = React.createClass({
    render() {
        return (
            <div className="on_deck">
                <span className="align-helper" />
                <img src={this.props.on_deck} />
            </div>
        )
    }  
});

var ImgItem = React.createClass({
    render() {
        return (<img src={this.props.path} />)
    }
});

var ImgRow = React.createClass({  
    render () {
        return (
            <div className="img-row">
                <ul>
                    {this.props.children}
                </ul>
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
    getInitialState() {
        return {
            on_deck: this.props.on_deck,
            imgs: this.props.imgs
        }
    },
    render() {
        return (
          <div className="pull-right gallery">
            <SelectedImg key="selected6789" on_deck={this.state.on_deck.img} />
            <ImgRow key="row7766">
              {this.state.imgs.map(function(image) {
                  return (
                    <li onClick={this.handleClick.bind(this, image)}>
                      <ImgItem key={image.id} path={image.img} />
                    </li>
                  )
                }, this)}
            </ImgRow>
          </div>
        );
    }
});