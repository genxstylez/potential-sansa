'use strict';

import React from 'react/addons';
import Router from 'react-router';
var State = require('react-router').State;
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

const RouteHandler = Router.RouteHandler;
export default React.createClass({
    mixins: [State],

    render() {
        const name = this.getPath();
        return (
            <RouteHandler />
        );
    }

});