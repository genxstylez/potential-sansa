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

    handleClick() {
        this.props.onStatus(!this.state.selected);
        this.setState({
            selected: !this.state.selected // toggle the state
        });
    },

    componentDidMount() {
        this.setState({
            selected: this.props.selected
        });
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.selected
        });
    },

    render() {
        var icon_cls = this.state.selected ? this.props.className + " selected" : this.props.className
        return(
            <span data-toggle="tooltip" data-placement="top" title={this.props.tooltip} className={icon_cls} onClick={this.handleClick} />
        )
    }
});
