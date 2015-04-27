'use strict';

import React from 'react/addons';
import _ from 'lodash';
import WebAPIMixin from '../mixins/WebAPIMixin';

export default React.createClass({
    mixins: [WebAPIMixin],

    getInitialState() {
        return {
            labelMessage: "Type your email and hit enter to subcribe"
        }
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    _createSubscriber(value) {
        this.createSubscriber(value, (error, response) => {
            window.p = response;
            this.setState({
                labelMessage: response.status==201 ? "Thanks for subscribing!" : JSON.parse(response.text).subscribers.email[0]
            });
        });
    },
    componentDidMount() {
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
    render() {
        return (
            <div ref="container">
                <div className="search-layer show">
                    <span className="close">
                        <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                    </span>
                    <form className="subscribe-form" onSubmit={this.handleSubmit}>
                        <input ref="email_input" name="q" type="email" autoComplete="off" autoFocus={true} />
                        <label ref="labelMessage">{this.state.labelMessage}</label>
                    </form>
                </div>
            </div>
        );
    }

});