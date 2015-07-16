'use strict';

import React from 'react/addons';
import APIMixin from '../mixins/APIMixin';
import classNames from 'classnames';

export default React.createClass({
    mixins: [APIMixin],

    getInitialState() {
        return ({
            editing: false,
            value: "",
            db_value: ""
        });
    },

    _updatePost(element_id, params) {
        this.updatePost(element_id, params, (error, response) => {
            if(error) {
                this.props.hasError(); 
                this.setState({
                    value: this.state.db_value
                });
            } else {
                this.setState({
                    db_value: this.state.value
                });
                $(React.findDOMNode(this.refs.TextArea)).redactor('core.destroy');
            }
        });
    },

    handleClick() {
        this.setState({
            editing: true
        });
    },

    handleBlur(value) {
        this.setState({
            editing: false,
            value: value
        });
        var params = {};
        params[this.props.name] = value;
        this._updatePost(this.props.element_id, params);
    },

    componentDidMount() {
        this.setState({
            value: this.props.content,
            db_value: this.props.content
        });
    },

    componentDidUpdate() {
        var that = this;
        $(React.findDOMNode(this.refs.TextArea)).redactor({
            'lang': 'zh_tw',
            'focus': 'true',
            'minHeight': '500',
            'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor', 'formatting'],
            'plugins': ['scriptbuttons', 'fullscreen'],
            'blurCallback': function() {
                that.handleBlur(this.code.get());
            }
        });
    },

    render() {
        if(this.state.editing){
            return (<span>
                    <textarea
                        ref="TextArea"
                        name={this.props.name}
                        defaultValue={this.state.value} />
                    <p className="help-block">若要換行請輸入shift+enter, 分段落請輸入enter</p>
                </span>);
                
        } else {
            return (
                <div className={this.props.className} 
                    onClick={this.handleClick}
                    dangerouslySetInnerHTML={{__html: this.state.value}} />
            );
            
        }
    }
});
