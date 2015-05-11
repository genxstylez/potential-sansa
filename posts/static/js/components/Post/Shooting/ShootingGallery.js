'use strict';

import React from 'react/addons';
import _ from 'lodash';
import ShootingCredit from './ShootingCredit';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var SelectedImg = React.createClass({
    render() {
        const creditNodes = _.map(this.props.credits, (value, key) => {
            return (
                <ShootingCredit key={key} role={key} names={value}/>
            );
        });
        if (this.props.show_credits) {
            return (
                <div className="on_deck shooting-credits">
                    <div className="shooting-credits-inner">
                        {creditNodes}
                    </div>
                </div>
            )
        }
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
        credits: React.PropTypes.object,
        show_credits: React.PropTypes.bool.isRequired
    },
    componentWillReceiveProps(nextProps) {
        if(this.isMounted()) {
            this.setState({
                on_deck: nextProps.show_credits ? {id: 'unique-string-credits'} : nextProps.on_deck,
                imgs: nextProps.imgs,
                show_credits: nextProps.show_credits,
                credits: nextProps.credits
            })
        };
        this.forceUpdate();
    },
    handleClick(image_url) {
        this.setState({
            on_deck: image_url,
            show_credits: false
        });
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
            imgs: this.props.imgs,
            show_credits: false,
            credits: {}
        }
    },
    render() {

        return (
            <div className="gallery shooting">
                <TransitionGroup transitionName="gallery">
                    <SelectedImg 
                        key={this.state.on_deck.id} 
                        on_deck={this.state.on_deck} 
                        show_credits={this.state.show_credits} 
                        credits={this.state.credits} />
                </TransitionGroup>
                <div className="arrow left" onClick={this.handleLeftArrow}>
                    <span className="align-helper" />
                    <img src={STATIC_URL + "img/left-arrow.png"} />
                </div>
                <ul className="images" ref="imgRow">
                  {this.state.imgs.map(function(image) {
                      return (
                            <li key={image.id} >
                                <img src={image.img.small} 
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