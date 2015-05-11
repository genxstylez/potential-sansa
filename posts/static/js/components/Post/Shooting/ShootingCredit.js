'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        role: React.PropTypes.string.isRequired,
    },
    render() {
        const names = [];
        if(this.props.names instanceof Array) {
            _.forEach(this.props.names, (name, key) => {
                names.push(<Link key={key} to="search" query={{q: name}}>{name}</Link>);
                if (key < this.props.names.length -1) 
                    names.push(', ')
            });
        } else {
            names.push(<Link key="single-credit" to="search" query={{q: this.props.names}}>{this.props.names}</Link>);
        }
        return (
            <div className="credit">
                <span className="label role">{this.props.role}</span>
                <span className="name">{names}</span>
            </div>
        );
    }
});