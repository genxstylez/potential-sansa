'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import APIMixin from '../mixins/APIMixin';

const Link = Router.Link;

export default React.createClass({
    mixins: [APIMixin],

    propTypes: {
        role: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return ({
            editing: false,
            role: "",
            name: "",
        })
    },

    _updatePost(element_id, params) {
        this.updatePost(element_id, params, (error, response) => {
            if(error) {
                this.props.hasError(); 
            } else {
                this.setState({
                    editing: false
                });
            }
        });
    },

    _createCredit(params) {
        this.createCredit(params, (error, response) => {
            if(error) {
                this.props.hasError(); 
            } else {
                this.setState({
                    editing: false,
                    id: response.headers['location'].split('/')[6]
                });
            }
        });
    },

    _deleteCredit(id) {
        this.deleteCredit(id, (error, response) => {
            if(error) {
                this.props.hasError(); 
            } else {
                this.props.onClickRemove();
            }
        });
    },

    _updateCredit(id, params) {
        this.updateCredit(id, params, (error, response) => {
            if(error) {
                this.props.hasError(); 
            } else {
                this.setState({
                    editing: false,
                });
            }
        });
    },

    handleClickMinus() {
        this.props.onClickRemove();
    },

    handleClickRemove() {
        this._deleteCredit(this.state.id);
    },

    handleClickOk() {
        var params = {
            'role': this.state.role,
            'name': this.state.name,
            'post': this.props.element_uri.replace("posts", "admin_posts")
        };
        if(this.props.new_entry) { // means new entry
            this._createCredit(params);
        } else {
            this._updateCredit(this.state.id, params);
        }
    },

    handleRoleChange(e) {
        this.setState({
            role: e.target.value
        });
    },

    handleNamechange(e) {
        this.setState({
            name: e.target.value
        });
    },

    handleClick() {
        this.setState({
            editing: true
        })
    },

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip()
    },

    componentDidMount(){
        this.setState({
            editing: this.props.editing,
            role: this.props.role,
            name: this.props.name,
            id: this.props.id
        });
    },

    render() {
        if(this.state.editing) {
            return (
                 <div className="credit">
                    <div className="form-group" style={{marginRight: "10px"}}>
                        <label className="sr-only">職稱</label>
                        <input className="form-control" type="text" onChange={this.handleRoleChange} placeholder="職稱" value={this.state.role}/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only">姓名</label>
                        <input className="form-control" type="text" onChange={this.handleNamechange} placeholder="姓名" value={this.state.name}/>
                        
                    </div>
                    <div className={this.state.role != "" && this.state.name != "" ? "form-group" : "form-group hidden"}>
                        <span data-toggle="tooltip" data-placement="top" title="儲存"
                            className="glyphicon glyphicon-ok" onClick={this.handleClickOk} />
                    </div>
                    <div className="form-group">
                        <span data-toggle="tooltip" data-placement="top" title="移除"
                            className="glyphicon glyphicon-minus" onClick={this.handleClickMinus} />
                    </div>
                    <p className="help-block">複數人數請用半形逗號分隔開 (例如:Amber Chan, 小叮噹)</p>
                </div>
            );
        } else {
            return (
                <div className="credit">
                    <span className="label role" onClick={this.handleClick}>{this.state.role}</span>
                    <span className="name" onClick={this.handleClick}>{this.state.name}</span>
                    <span data-toggle="tooltip" data-placement="top" title="移除" 
                        className="glyphicon glyphicon-remove" style={{fontSize:"12px"}} onClick={this.handleClickRemove} />
                </div>
            );
        }
    }
});