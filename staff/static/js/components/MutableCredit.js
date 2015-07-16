'use strict';

import React from 'react/addons';
import APIMixin from '../mixins/APIMixin';
import classNames from 'classnames';
import MutablePostCredit from './MutablePostCredit';
import _ from 'lodash';

export default React.createClass({
    mixins: [APIMixin],

    getInitialState() {
        return ({
            credits: [],
            creditNodes: []
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

    handleClick() {
        var unique_key = parseInt(Math.random()*1000)
        this.setState({
            credits: this.state.credits.concat([{
                id: unique_key,
                role: "",
                name: "",
                new_entry: true
            }])
        });
    },

    handleClickRemove(credit) {
        var credits = this.state.credits.slice(0);
         _.remove(credits, function(obj) {
            return obj == credit;
        });
        this.setState({
            credits: credits
        });
    },


    componentDidMount() {
        this.setState({
            credits: this.props.credits
        });
    },

    render() {
        const creditNodes = _.map(this.state.credits, credit => {
            return (
                <MutablePostCredit 
                    key={credit.id} 
                    id={credit.id}
                    element_id={this.props.element_id}  
                    element_uri={this.props.element_uri}  
                    role={credit.role} 
                    name={credit.name} 
                    editing={_.has(credit, 'new_entry')? true: false}
                    new_entry={_.has(credit, 'new_entry')? credit.new_entry: false}
                    hasError={this.props.hasError}
                    onClickRemove={this.handleClickRemove.bind(this, credit)} />
            );
        });
        return (
            <form className="form-inline">
                {creditNodes}
                <span data-toggle="tooltip" data-placement="top" title="新增Credit" className="glyphicon glyphicon-plus" onClick={this.handleClick} />
            </form>
        );
            
    }
});
