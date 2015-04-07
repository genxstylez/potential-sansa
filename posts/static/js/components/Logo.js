'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';

const Link = Router.Link;

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    handleClick() {
        this.context.router.transitionTo('/')
    },
    render() {
        var styles = {
            TopBlackBar: {
                height: "17px",
                backgroundColor: "#000000",
            },
            logo: {
                margin: "50px auto 36px auto",
                textAlign: "center",
            },
            logoImg: {
                width: "222px",
            }
        };
        return (
            <div>
                <div className="row top-black-bar" style={styles.TopBlackBar}></div>
                <div className="row logo" style={styles.logo} onClick={this.handleClick}>
                    <img style={styles.logoImg} src="/static/img/logo.png"></img>
                </div>
            </div>
        );
    }

});
