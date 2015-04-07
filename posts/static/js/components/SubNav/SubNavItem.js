'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        parent_id: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string.isRequired
    },

    render() {
        var styles = {
            anchor: {
                fontSize: "14px",
                color: "#000",
                letterSpacing: "0.1em",
                lineHeight: "1.5",
            }
        };
        return (
            <Link key={this.props.id} 
                style={styles.anchor} 
                to="subcategory" 
                params={{
                    categoryId: this.props.parent_id, 
                    subcategoryId: this.props.id}}>{this.props.name}</Link>
        );
    }

});