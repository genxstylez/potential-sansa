'use strict';

import React from 'react/addons';
import Router from 'react-router';
import _ from 'lodash';

const Link = Router.Link;

export default React.createClass({
    render() {
        if (this.props.isSub) {
            return(
                <Link key={this.props.id} className="list-group-item sub" to="subcategory"
                    params={{categoryId: this.props.parent_id, subcategoryId: this.props.id}}>
                    {this.props.name}
                </Link>
            )
        } else {
            return (
                <Link key={this.props.id} className="list-group-item" to="category" params={{categoryId: this.props.id}}>
                    {this.props.name}
                </Link>
            );
        }
    }
});
