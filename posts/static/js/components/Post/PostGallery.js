'use strict';

import React from 'react/addons';
import _ from 'lodash';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');


function generate_embed(youtube_id) {
    var width = $('.on_deck').width();
    var height = width / 1.5;

    return '<iframe width="' + width + '" height="' + height + '" ' +
            'src="https://www.youtube.com/embed/' + youtube_id + '" ' +
            'frameborder="0" allowfullscreen></iframe>';
};

var SelectedImg = React.createClass({
    render() {
        var onDeckNode = this.props.on_deck.video_id ? 
            <div key={this.props.on_deck.video_id} className="video-embed" dangerouslySetInnerHTML={{__html: generate_embed(this.props.on_deck.video_id)}} /> :  
            <img src={this.props.on_deck.img !== undefined ? this.props.on_deck.img.large : ''} />
        return (
            <div className="on_deck">
                <span className="align-helper" />
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
        $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "-=250"
        }, 200);
    },
    handlerRightArrow() {
          $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "+=250"
        }, 200);
    },
    getInitialState() {
        return {
            on_deck: {'id': '99-00-11'},
            imgs: []
        }
    },
    componentDidMount() {
        this.setState({
            on_deck: this.props.on_deck,
            imgs: this.props.imgs
        });
    },
    render() {
        return (
          <div className="pull-right gallery">
            <TransitionGroup transitionName="gallery" transitionLeave={false}>
                <SelectedImg key={this.state.on_deck.id} on_deck={this.state.on_deck} />
            </TransitionGroup>
            <div className="arrow left" onClick={this.handleLeftArrow}>
                <span className="align-helper" />
                <img src={STATIC_URL + "img/left-arrow.png"} />
            </div>
            <ul className="thumbnails" ref="thumbnailsRow">
                {this.state.imgs.map(function(image) {
                    var src = _.has(image.img, 'small') ? image.img.small: "";
                    if (image.video_id) {
                        src = "https://i.ytimg.com/vi/" + image.video_id + "/hqdefault.jpg"
                    }
                    return (
                        <li key={image.id}>
                            <img src={src} 
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