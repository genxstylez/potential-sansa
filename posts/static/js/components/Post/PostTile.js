'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
        created_at: React.PropTypes.string.isRequired,
        last_modified: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string,
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    handleClick() {
        this.context.router.transitionTo('post', {postId: this.props.id});
    },
    render() {

        return (
            <div className="tile"  onClick={this.handleClick}>
                <img src={this.props.cover.img.medium} ></img>
                <div className="intro">
                    <div className="info">
                        { this.props.category} | {new Date(this.props.created_at).toDateString()}
                    </div>
                    <div className="heading">
                        {this.props.heading}
                    </div>
                    <div className="sub-heading">
                        {this.props.subheading}
                    </div>

                    <div className="divider">
                        <span className="twin circle-divider"></span>
                        <span className="twin circle-divider"></span>
                    </div>

                    <div className="synopsis"
                        dangerouslySetInnerHTML={{__html: truncate(this.props.articletext, 50)}}>
                    </div>
                </div>
                <div className="triangle"></div>
            </div>
        );
    }
});