'use strict';

import React from 'react/addons';
import Router from 'react-router';
import APIMixin from '../mixins/APIMixin';
import _ from 'lodash';

const Link = Router.Link;

export default React.createClass({
    mixins: [APIMixin],

    _deleteCategory(id) {
        this.deleteCategory(id, (error, response) => {
            if(!error)
                this.props.refreshCategory();
        });
    },

    ClickMinus() {
        var r = confirm("確定要刪除此類別？");
        if(r)
            this._deleteCategory(this.props.id);
    },

    render() {
        if (this.props.isSub) {
            return(
                <li key={this.props.id} className="list-group-item sub">
                    <Link to="subcategory" params={{categoryId: this.props.parent_id, subcategoryId: this.props.id}}>{this.props.name}</Link>
                    <span className="pull-right">
                        <span className="glyphicon glyphicon-remove" onClick={this.ClickMinus}></span>
                    </span>
                </li>
            )
        } else {
            return (
                <li key={this.props.id} className="list-group-item">
                    <Link to="category" params={{categoryId: this.props.id}}>{this.props.name}</Link>
                    <span className="pull-right">
                        <span className="glyphicon glyphicon-remove" onClick={this.ClickMinus}></span>
                    </span>
                </li>

            );
        }
    }
});
