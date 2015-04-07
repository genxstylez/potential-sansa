'use strict';

import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../mixins/WebAPIMixin';


const Link = Router.Link;

var footer_text = "&copy; O'logy Co.,Ltd All rights reserved.";
export default React.createClass({
    render() {
        return (
            <div className="row footer" dangerouslySetInnerHTML={{__html: footer_text}} />
        );

    }
});
