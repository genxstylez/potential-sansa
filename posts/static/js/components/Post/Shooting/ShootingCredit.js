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
        const name_array = this.props.name.split(',');
        const names = [];
        _.forEach(name_array, (name, key) => {
            names.push(<a href={"/search/?q=" + name }>{name}</a>);
            // names.push(<Link key={key} to="search" query={{q: name}}>{name}</Link>);
            if (key < name_array.length -1) 
                names.push(', ')
        });
        return (
            <div className="credit">
                <div className="role">{this.props.role}</div>
                <div className="name">{names}</div>
            </div>
        );
    }
});