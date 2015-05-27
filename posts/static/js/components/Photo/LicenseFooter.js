'use strict';

import React from 'react/addons';
import classNames from 'classnames';

var license_text = '<p>「Photo」區照片採創用 cc 之授權模式，可免費使用、轉載，惟需標明照片來源為本站。有關授權詳細內容請點選下方連結。 </p>' +
'<p>All photos in this category are fall under the creative commons attribution 3.0 unported license which means you’re free to use photos for personal and commercial purposes.</p>' +
'<p>And you shall provide a link or give appropriate credit to O’logy website. Check out the full license description below.</p>' +
'<div class="license-footer-link">'+
'<a target="_blank" href="http://creativecommons.org/licenses/by/3.0">http://creativecommons.org/licenses/by/3.0</a>' +
'</div>';


export default React.createClass({
    propTypes: {
        photographer: React.PropTypes.string
    },
    getInitialState() {
        return({
            collapsed: true,
            content: license_text,
            current_title: ""
        })
    },
    handleOnClick() {
        if(!this.state.collapsed) {
            this.setState({
                collapsed: true,
            });
        }
    },

    handleOnClickTitle(e) {
        switch(e.target.innerHTML) {
            case "License":
                this.setState({
                    current_title: "License",
                    content: license_text,
                    collapsed: false
                });
                break;
            case "Photographer":
                this.setState({
                    current_title: "Photographer",
                    content: this.props.photographer,
                    collapsed: false
                });
                break;
        }
    },
    componetWillReceiveProps(nextProps, nextState) {
        if(nextState.collapsed) {
            this.setState({
                current_title: "",
                content: ""
            });
        }
    },
    render() {
        var cls = classNames({
            'row': true,
            'footer': true,
            'license-footer': true,
            'collapsed': this.state.collapsed
        });
        var title_cls = classNames({
            'title': true,
            'hidden': !this.state.collapsed
        });
        var current_title_cls = classNames({
            'current-title': true,
            'hidden': this.state.collapsed
        });
        var photographer_node = "";
        if (this.props.photographer) {
             photographer_node = <span>
                    <span onClick={this.handleOnClickTitle}
                        onMouseEnter={this.handleOnMouseEnter}
                        onMouseOut={this.handleOnMouseOut}>Photographer</span>
                    <span className="circle-divider" />
                </span>
        };
        return (
            <div className={cls} onClick={this.handleOnClick}>
                <div className={title_cls}>
                    <span className="circle-divider" />
                    <span onClick={this.handleOnClickTitle}
                        onMouseEnter={this.handleOnMouseEnter}
                        onMouseOut={this.handleOnMouseOut}>License</span>
                    <span className="circle-divider" />
                    {photographer_node}
                </div>
                <div className={current_title_cls}>
                    <span className="circle-divider" />
                    <span onClick={this.handleOnClickTitle}
                        onMouseEnter={this.handleOnMouseEnter}
                        onMouseOut={this.handleOnMouseOut}>{this.state.current_title}</span>
                    <span className="circle-divider" />
                </div>
                <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                
            </div>
        );

    }
});
