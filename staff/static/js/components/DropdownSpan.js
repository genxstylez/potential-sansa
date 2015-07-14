'use strict';

import React from 'react/addons';
import _ from 'lodash';
import APIMixin from '../mixins/APIMixin';
import classNames from 'classnames';

export default React.createClass({
    mixins: [APIMixin],

    getInitialState() {
        return ({
            categories: [],
            value: "",
            db_value: ""
        });
    },

    _getCategories() {
        this.getCategories((error, response) => {
            this.setState({ categories: error ? [] : response.body.objects });
        });
    },

    _updatePost(element_id, params) {
        this.updatePost(element_id, params, (error, response) => {
            if(error) {
                this.props.hasError(); 
                this.setState({
                    value: this.state.db_value
                });
            } else {
                this.setState({
                    db_value: this.state.value
                });
            }
        });
    },

    handleClick(category) {
        var params = {};
        // HACK for tastypie
        var url = "/staff_api/v1/admin_categories/" + category.id + "/";
        params[this.props.name] = url
        this._updatePost(this.props.element_id, params);
        this.setState({
            value: category.name
        });
    },

    componentDidMount() {
        this._getCategories();
        this.setState({
            value: this.props.content,
            db_value: this.props.content
        });
    },

    render() {
        const CategoryNodes = [];
        _.map(this.state.categories, category => {
            CategoryNodes.push(<li 
                className={this.props.content == category.name ? "active": ""} 
                key={category.id} 
                id={category.id}
                onClick={this.handleClick.bind(this, category)}>
                <a href="#">{category.name}</a>
            </li>);
            _.map(category.children, subcategory => {
                CategoryNodes.push(<li 
                    className={this.props.content == subcategory.name ? "active": ""} 
                    key={subcategory.id} 
                    parent_id={category.id} 
                    id={subcategory.id}
                    style={{textIndent: "15px"}}
                    onClick={this.handleClick.bind(this, subcategory)}>
                    <a href="#">{subcategory.name}</a>
                </li>);
            });
        });
        return (
            <div className="btn-group">
                <span data-toggle="dropdown" className={this.props.className}>
                    {this.state.value}
                    <span className="caret" />
                </span>
                <ul className="dropdown-menu">
                    {CategoryNodes}
                </ul>
            </div>
        );
            
    }
});
