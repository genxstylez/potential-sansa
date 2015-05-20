'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        parent_id: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        zh_name: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            display: '',
        }
    },

    componentDidMount() {
        this.setState({
            display: this.props.name
        });
    },

    handleOnMouseEnter() {
        this.setState({
            display: this.props.zh_name,
        });
    },

    handleOnMouseOut() {
        this.setState({
            display: this.props.name,
        });
    },
    render() {
        return (
            <Link key={this.props.id} 
                to="subcategory" 
                onMouseEnter={this.handleOnMouseEnter}
                onMouseOut={this.handleOnMouseOut}
                params={{
                    categoryId: this.props.parent_id, 
                    subcategoryId: this.props.id}}>{this.state.display}</Link>
        );
    }

});