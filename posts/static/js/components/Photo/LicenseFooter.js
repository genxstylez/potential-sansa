'use strict';

import React from 'react/addons';
import classNames from 'classnames';

var footer_text = '<p>「Photo」區照片採創用 cc 之授權模式，可免費使用、轉載，惟需標明照片來源為本站。有關授權詳細內容請點選下方連結。 </p>' +
'<p>All photos in this category are fall under the creative commons attribution 3.0 unported license which means you’re free to use photos for personal and commercial purposes.</p>' +
'<p>And you shall provide a link or give appropriate credit to O’logy website. Check out the full license description below.</p>';

export default React.createClass({
    propTypes: {
        collapsed: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return({
            collapsed: false
        })
    },
    componentWillUpdate() {
        if (!this.state.collapsed)
            this.setState({
                collapsed: true
            });
    },

    handleOnClick() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    },
    render() {
        var cls = classNames({
            'row': true,
            'footer': true,
            'license-footer': true,
            'collapsed': this.state.collapsed
        });
        return (
            <div className={cls} onClick={this.handleOnClick}>
                <div className="title">
                    <span className="circle-divider" />
                    License
                    <span className="circle-divider" />
                </div>
                <div dangerouslySetInnerHTML={{__html: footer_text}} />
                <div className="license-footer-link">
                    <a target="_blank" href="http://creativecommons.org/licenses/by/3.0">http://creativecommons.org/licenses/by/3.0</a>
                </div>
            </div>
        );

    }
});
