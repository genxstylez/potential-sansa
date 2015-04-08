'use strict';

import React from 'react';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        zh_title: React.PropTypes.string.isRequired,
        en_title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
        created_at: React.PropTypes.string.isRequired,
        last_modified: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string.isRequired,
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    handleClick() {
        this.context.router.transitionTo('post', {postId: this.props.id});
    },
    render() {
        var styles = {
            tile: {
                maxWidth: "320px",
                textAlign: "center",
                cursor: "pointer",
                padding: "2px",
            },
            tileImg: {
                width: "100%",
            },
            tileIntro: {
                textTransform: "uppercase",
                padding: "10px 35px 35px",
                backgroundColor: "#f7f7f7"
            },
            tileIntroInfo: {
                fontSize: "7px",
                marginBottom: "5px",
            },
            tileIntroHeading: {
                fontSize: "20px",
                letterSpacing: "0.1em"
            },
            tileIntroSubHeading: {
                fontSize: "14px",
            },
            tileIntroDivider: {
                marginTop: "0px",
                marginBottom: "12px",
            },
            tileIntroSynopsis: {
                fontSize: "11px",
                textAlign: "justify",
                lineHeight: "19px",
            },
            tileTriangle: {
                fontSize: "0px",
                lineHeight: "0%",
                width: "0px",
                borderBottom: "14px solid #000",
                borderRight: "14px solid #f7f7f7",
                marginTop: "-14px",
            },
            circleDivider: {
                backgroundColor: "#000",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                display: "inline-block",
                margin: "1px",
            },

        };
        return (
            <div className="tile" style={styles.tile} onClick={this.handleClick}>
                <img src={this.props.cover.img.medium} style={styles.tileImg}></img>
                <div className="intro" style={styles.tileIntro}>
                    <div className="info" style={styles.tileIntroInfo}>
                        { this.props.category} | {new Date(this.props.created_at).toDateString()}
                    </div>
                    <div className="heading" style={styles.tileIntroHeading}>
                        {this.props.zh_title}
                    </div>
                    <div className="sub-heading" style={styles.tileIntroSubHeading}>
                        {this.props.en_title}
                    </div>

                    <div className="divider" style={styles.tileIntroDivider}>
                        <span className="twin circle-divider" style={styles.circleDivider}></span>
                        <span className="twin circle-divider" style={styles.circleDivider}></span>
                    </div>

                    <div className="synopsis" style={styles.tileIntroSynopsis} 
                        dangerouslySetInnerHTML={{__html: truncate(this.props.content, 50)}}>
                    </div>
                </div>
                <div className="triangle" style={styles.tileTriangle}></div>
            </div>
        );
    }
});