'use strict';

import React from 'react/addons';
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
        var logo_src = STATIC_URL + "img/logo.png";
        
        return (
            <div>
                <div className="row top-black-bar" style={styles.TopBlackBar}></div>
                <div className="row logo" style={styles.logo} onClick={this.handleClick}>
                    <img style={styles.logoImg} src={logo_src}></img>
                </div>
            </div>
        );
    }

});
