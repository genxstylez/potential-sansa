'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import moment from 'moment';
var Navigation = require('react-router').Navigation;


export default React.createClass({
    mixins: [Navigation],
    
    propTypes: {
        id: React.PropTypes.number.isRequired,
        cover: React.PropTypes.object.isRequired,
        created_at: React.PropTypes.string.isRequired,
        last_modified: React.PropTypes.string.isRequired,
    },
    handleClick() {
        this.transitionTo('album', {albumId: this.props.id});
    },
    render() {

        return (
            <div className="album-tile"  onClick={this.handleClick}>
                <img src={this.props.cover.img.medium} ></img>
            </div>
        );
    }
});