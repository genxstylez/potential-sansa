'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        role: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="credit">
                <span className="role">{this.props.role}</span>
                <span className="name">{this.props.name}</span>
            </div>
        );
    }
});