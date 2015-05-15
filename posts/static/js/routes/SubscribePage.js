'use strict';

import React from 'react/addons';
import _ from 'lodash';
import WebAPIMixin from '../mixins/WebAPIMixin';

export default React.createClass({
    mixins: [WebAPIMixin],

    getInitialState() {
        return {
            labelMessage: <p>Type your email and hit enter to subcribe<br />請輸入您的email並按下Enter</p>,
            query_string: ""
        }
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    _createSubscriber(value) {
        this.createSubscriber(value, (error, response) => {
            this.setState({
                query_string: "",
                labelMessage: response.status==201 ? "Thanks for subscribing!" : JSON.parse(response.text).subscribers.email[0]
            });
        });
    },
    handeClickOnCross() {
       if(!this.context.router.goBack()) {
            this.context.router.transitionTo('/')
       }
    },
    handleSubmit(e) {
        e.preventDefault();
        var email_value = React.findDOMNode(this.refs.email_input).value.trim();
        this._createSubscriber(email_value);
    },
    handleOnChange(e) {
        this.setState({
            query_string: e.target.value
        });
    },
    handleOnClickPage() {
        React.findDOMNode(this.refs.email_input).focus();
    },
    render() {
        return (
            <div ref="container" onClick={this.handleOnClickPage}>
                <div className="search-layer show">
                    <span className="close">
                        <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                    </span>
                    <form className="subscribe-form" onSubmit={this.handleSubmit}>
                        <div className="value-field">{this.state.query_string}</div>
                        <input className="tiny-input" ref="email_input" 
                            name="q" type="email" autoComplete="off" autoFocus={true} 
                            onChange={this.handleOnChange} />
                        <label ref="labelMessage">{this.state.query_string ? "" : this.state.labelMessage}</label>
                    </form>
                </div>
            </div>
        );
    }

});