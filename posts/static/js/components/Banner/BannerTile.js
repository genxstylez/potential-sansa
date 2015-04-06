'use strict';

import React from 'react';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';


const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        zh_title: React.PropTypes.string.isRequired,
        en_title: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
    },
    render() {
        return (
            <div className="banner-tile">
                <img src={this.props.cover.img} />
                <div className="title">
                    <Link key={this.props.id} to="post" params={{postId: this.props.id}}>
                        {this.props.zh_title}<span className="circle-divider"></span>{this.props.en_title}
                    </Link>
                </div>
            </div>
        );
    }
});