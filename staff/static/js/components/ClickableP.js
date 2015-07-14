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
            }
        });
    },

    handleOnClick() {
        this.setState({
            editing: true
        });
    },

    handleOnBlur() {
        this.setState({
            editing: false
        });
        var params = {};
        params[this.props.name] = this.state.value;
        this._updatePost(this.props.element_id, params);
    },

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    },

    handleKeyUp(e) {
        if(e.key==='Enter')
            this.handleOnBlur();
    },

    componentDidMount() {
        this.setState({
            value: this.props.content,
            db_value: this.props.content
        });
    },

    render() {
        if(this.state.editing){
            return (<input
                name={this.props.name}
                style={{margin: "10px 0"}} 
                className="form-control" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleOnBlur}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp} />);
        } else {
            return (
                <p className={this.props.className} 
                    onClick={this.handleOnClick}>
                    {this.state.value}
                </p>
            );
            
        }
    }
});
