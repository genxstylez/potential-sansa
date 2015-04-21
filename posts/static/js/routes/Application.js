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
        var name = this.context.router.getCurrentPath();
        return (
            <div>
                <TransitionGroup transitionName="ologyapp">
                    <RouteHandler key={name}/>
                </TransitionGroup>
            </div>
        );
    }

});