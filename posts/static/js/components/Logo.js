'use strict';

import React from 'react/addons';
import _ from 'lodash';

export default React.createClass({
    render() {
        var styles = {
            TopBlackBar: {
                height: "17px",
                backgroundColor: "#000000",
            },
            logo: {
                margin: "50px auto 36px auto",
                width: "222px",
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
                <div className="row logo" style={styles.logo}>
                    <img style={styles.logoImg} src={logo_src}></img>
                </div>
            </div>
        );
    }

});
