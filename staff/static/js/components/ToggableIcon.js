'use strict';

import React from 'react/addons';
import APIMixin from '../mixins/APIMixin';
import classNames from 'classnames';

export default React.createClass({
    mixins: [APIMixin],

    getInitialState() {
        return ({
            selected: false
        });
    },
    _updatePost(element_id, params) {
        this.updatePost(element_id, params, (error, response) => {
            if(error) {
                this.props.hasError(); 
                
            } else {
                this.setState({
                    selected: !this.state.selected // toggle the state
                });
            }
        });
    },
    handleClick() {
        var params = {};
        params[this.props.name] = !this.state.selected // send the reverse selected state
        this._updatePost(this.props.element_id, params); 
    },

    componentDidMount() {
        this.setState({
            selected: this.props.selected
        });
    },

    render() {
        var icon_cls = this.state.selected ? this.props.className + " selected" : this.props.className
        return(
            <span data-toggle="tooltip" style={this.props.style} data-placement="top" title={this.props.tooltip} className={icon_cls} onClick={this.handleClick} />
        )
    }
});
