'use strict';

import React from 'react/addons';
import Router from 'react-router';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

const RouteHandler = Router.RouteHandler;
export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render() {
        return (
            <div>
                <RouteHandler key={name}/>
            </div>
        );
    }

});