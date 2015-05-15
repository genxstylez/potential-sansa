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
        zh_name: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            display: ''
        }
    },

    componentDidMount() {
        this.setState({
            display: this.props.name
        });
    },

    handleOnMouseEnter() {
        this.setState({
            display: this.props.zh_name
        });
    },

    handleOnMouseOut() {
        this.setState({
            display: this.props.name
        });
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
                to="category"
                params={{categoryId: this.props.id}}
                onMouseEnter={this.handleOnMouseEnter}
                onMouseOut={this.handleOnMouseOut}>{this.state.display}</Link>
        );
    }

});