'use strict';

import React from 'react/addons';
import APIMixin from '../mixins/APIMixin';
import classNames from 'classnames';
var Modal = require('react-modal');

var appElement = document.querySelector('.react-container');
Modal.setAppElement(appElement);
Modal.injectCSS();

export default React.createClass({
    mixins: [APIMixin],

    getInitialState() {
        return ({
            editing: false,
            id: 0,
            img: {small: ""},
            caption: "",
            tag: "",
            video_id: "",
            video_url: ""
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

    handleClickTile() {
        this.setState({
            editing: true
        });
    },

    closeModal() {
        this.setState({
            editing: false
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

    handleChangeCaption(e) {
        this.setState({
            caption: e.target.value
        });
    },

    handleChangeTag(e) {
        this.setState({
            tag: e.target.value
        });
    },

    handleChangeVideo(e) {
        this.setState({
            video_url: e.target.value
        });
    },

    handleKeyUp(e) {
        if(e.key==='Enter')
            this.handleOnBlur();
    },

    componentDidMount() {
        this.setState({
            id: this.props.id,
            img: this.props.img,
            caption: this.props.caption,
            tag: this.props.tag,
            video_id: this.props.video_id,
            video_url: this.props.video_url
        });
    },

    render() {
            /*
    <input
                name={this.props.name}
                style={{margin: "10px 0"}} 
                className="form-control" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleOnBlur}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp} />
                <div className="modal fade" ref="Modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <form>
                                        goes
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
    */
        var src = this.state.img.small
        if (this.state.video_id) {
            src = "https://i.ytimg.com/vi/" + this.state.video_id + "/hqdefault.jpg"
        }
        return (
            <div>
                <div className="col-md-4 col-sm-4 col-lg-4 imgTile" onClick={this.handleClickTile}>
                    <div className="imgDiv">
                        <span className="align-helper" />
                        <img src={src} />
                    </div>
                    <p>註解: {this.state.caption}</p>
                    <p>書籤位置: {this.state.tag}</p>
                    <p>Youtube 網址: {this.state.video_url}</p>
                </div>
                <Modal isOpen={this.state.editing}
                    onRequestClose={this.closeModal}>
                    <span className="glyphicon glyphicon-remove close" onClick={this.closeModal} />
                    <form className="form-horizontal" style={{margin: "20px auto", width: "80%"}}>
                        <div className="form-group">
                            <img src={this.state.img.small} style={{marginBottom: "5px" }}/>
                            <input type="file" />
                        </div>
                        <div className="form-group">
                            <label>註解</label>
                            <input className="form-control" type="text" onChange={this.handleChangeCaption} value={this.state.caption} />
                        </div>
                        <div className="form-group">
                            <label>書籤位置</label>
                            <input className="form-control" type="text" onChange={this.handleChangeTag} value={this.state.tag} />
                        </div>
                        <div className="form-group">
                            <label>Youtube 網址</label>
                            <input className="form-control" type="text" onChange={this.handleChangeVideo} value={this.state.video_url} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{marginRight: "10px"}}>儲存</button>
                            <button type="button" className="btn btn-danger" style={{marginRight: "10px"}}>刪除</button>
                            <button type="button" className="btn btn-default" onClick={this.closeModal}>取消</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );

    }
});
