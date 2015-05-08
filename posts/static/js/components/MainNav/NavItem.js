'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';

const Link = Router.Link;

export default React.createClass({
    mixins: [ScrollListenerMixin],

    propTypes: {
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
            <Link key={this.props.id} style={styles.anchor} to="category" onClick={this.handleOnClick}
                params={{categoryId: this.props.id}}>{this.props.name}</Link>
        );
    }

});