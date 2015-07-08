'use strict';

import React from 'react/addons';
import _ from 'lodash';
import WebAPIMixin from '../mixins/WebAPIMixin';

export default React.createClass({
    mixins: [WebAPIMixin],

    getInitialState() {
        return {
            labelMessage: 
                <span>
                    <div style={{fontSize:"22px", letterSpacing:"0.05em"}}>Type your email and hit enter to subcribe</div>
                    <div style={{fontSize:"17px", letterSpacing:"0.05em", marginTop: "5px"}}>請輸入您的email並按下Enter</div>
                </span>,
            has_value: false
        }
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    _createSubscriber(value) {
        this.createSubscriber(value, (error, response) => {
            this.setState({
                has_value: false,
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
            has_value: e.target.value != ""
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
                        <input ref="email_input" 
                            name="q" type="email" autoComplete="off" autoFocus={true} 
                            onChange={this.handleOnChange} />
                        <label ref="labelMessage">{this.state.has_value ? "" : this.state.labelMessage}</label>
                    </form>
                </div>
            </div>
        );
    }

});