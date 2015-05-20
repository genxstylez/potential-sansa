'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import classNames from 'classnames';
import SubNavItem from './SubNavItem';

export default React.createClass({
    propTypes: {
        categories: React.PropTypes.array,
        parent_id: React.PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            categories: [],
        }
    },

    _getCategories(categoryId) {
        this.getCategories(categoryId, (error, response) => {
            this.setState({categories: error ? [] : response.body.objects});
        });
    },

    componentWillReceiveProps(nextProps) {
        this.setState({categories: nextProps.categories});
    },

    componentDidMount() {
        this.setState({categories: this.props.categories});
    },


    render() {
        var nav_classes = classNames({
            'sub-nav': true,
            'hidden': this.state.categories.length == 0
        });
        var NavItemNodes = [];
        for(var x in this.state.categories) {
            var category = this.state.categories[x]

            NavItemNodes.push(
                <SubNavItem key={category.id} 
                    parent_id={this.props.parent_id} 
                    id={category.id}
                    name={category.name}
                    zh_name={category.zh_name}
                    uri={category.resource_uri} />
            );

            if (x < this.state.categories.length -1) {
                NavItemNodes.push(<span key={x + 99}className="circle-divider"/>);
            }; 
        }
        return (
            <div className={nav_classes}>
                {NavItemNodes}
            </div>
        );
    }

});