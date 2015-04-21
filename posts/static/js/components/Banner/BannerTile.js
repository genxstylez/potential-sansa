'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';


const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
    },
    render() {
        return (
            <div className="banner-tile">
                <img src={this.props.cover.img.large} />
                <div className="title">
                    <Link key={this.props.id} to="post" params={{postId: this.props.id}}>
                        {this.props.heading}<span className="circle-divider"></span>{this.props.subheading}
                    </Link>
                </div>
            </div>
        );
    }
});