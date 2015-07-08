'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import SubNavBar from '../SubNav/SubNavBar';

const Link = Router.Link;

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        zh_name: React.PropTypes.string.isRequired,
        children: React.PropTypes.array,
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
            <span className="navitems">
                <Link key={this.props.id} 
                    to="category"
                    params={{categoryId: this.props.id}}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseOut={this.handleOnMouseOut}>{this.state.display}</Link>
                <SubNavBar parent_id={this.props.id} categories={this.props.children} />
            </span>
        

        );
    }

});