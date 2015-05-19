'use strict';

import React from 'react/addons';
import _ from 'lodash';
import WebAPIMixin from '../../mixins/WebAPIMixin';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var State = require('react-router').State;

export default React.createClass({
    mixins: [WebAPIMixin, State],

    getInitialState() {
        return ({
            id: 0,
            name: '',
            zh_name: '',
            photos: []
        });
    },

    _getAlbum(id) {
        this.getAlbum(id, (error, response) => {
            if(response.body)
                this.setState({
                    id: response.body.id,
                    photos: this.state.photos.concat(response.body.photos),
                    name: response.body.name,
                    zh_name: response.body.zh_name
                });
        });
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
    componentDidMount() {
        this._getAlbum(this.getParams().albumId);
    },
    render() {
        const thumbnailNodes = _.map(this.state.photos, photo => {
            return (
                <li key={photo.id}>
                    <img src={photo.img.small} 
                        onClick={this.handleClick.bind(this, photo)} />
                </li>
            );
        });
        return (
          <div className="album-gallery">
            <div className="arrow left" onClick={this.handleLeftArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/left-arrow.png"} />
            </div>
            <ul className="images" ref="imgRow">
                {thumbnailNodes}
            </ul>
            <div className="arrow right" onClick={this.handlerRightArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/right-arrow.png"} />
            </div>
          </div>
        );
    }
});