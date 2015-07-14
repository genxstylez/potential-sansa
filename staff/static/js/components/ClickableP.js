'use strict';

import React from 'react/addons';

export default React.createClass({
    getInitialState() {
        return ({
            editing: false,
            value: ""
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
    },

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    },

    componentDidMount() {
        this.setState({
            value: this.props.content
        });
    },

    render() {
        if(this.state.editing){
            return (<input
                style={{margin: "10px 0"}} 
                className="form-control" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleOnBlur}
                onChange={this.handleChange} />);
        } else {
            return (
                <p className={this.props.className} onClick={this.handleOnClick}>
                    {this.props.content}
                </p>
            );
            
        }
    }
});
