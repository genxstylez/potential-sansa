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
                <Link key={this.props.id} to="post" params={{postId: this.props.id}}>
                    <img src={this.props.cover.img.large} />
                    <div className="title">
                            {this.props.heading}
                            <span className="circle-divider"></span>
                            {this.props.subheading}
                    </div>
                </Link>
            </div>
        );
    }
});