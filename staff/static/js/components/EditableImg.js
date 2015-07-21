'use strict';

import React from 'react/addons';
import APIMixin from '../mixins/APIMixin';
import _ from 'lodash';
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
            img: "",
            caption: "",
            tag: "",
            video_id: "",
            video_url: "",
            img_changed: false,
            display_img: ""
        });
    },

    _getImage(id) {
        this.getImage(id, (error, response) => {
            if(error) {
                alert('Please try again!')
            } else {
                this.setState({
                    img_changed: false,
                    id: response.body.id,
                    img: response.body.img,
                    caption: response.body.caption,
                    tag: response.body.tag,
                    video_url: response.body.video_url,
                    video_id: response.body.video_id
                });
            }
        })
    },
    _updateImage(id, img, caption, tag, video_url, post_uri, post_id, changed) {
        this.updateImage(id, img, caption, tag, video_url, post_uri, post_id, changed, (error, response) => {
            if(error) {
                this.props.hasError(); 
                this.setState({
                    img_changed: false
                });
            } else {
                this._getImage(id)
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

    handleChangeImg(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0]

        reader.onload = function(upload) {
          self.setState({
            img: file,
            display_img: upload.target.result,
            img_changed: true
          });
        }

        reader.readAsDataURL(file);
    },

    handleChangeVideo(e) {
        this.setState({
            video_url: e.target.value
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        this._updateImage(this.props.id, 
            this.state.img,
            this.state.caption, 
            this.state.tag, 
            this.state.video_url, 
            this.props.post_uri.replace("posts", "admin_posts"),
            this.props.post_id,
            this.state.img_changed
        );
    },

    handleKeyUp(e) {
        if(e.key==='Enter')
            this.handleOnBlur();
    },

    componentDidMount() {
        var img = _.has(this.props.img, 'original') ? this.props.img.original: "";
        this.setState({
            id: this.props.id,
            img: img,
            display_img: img,
            caption: this.props.caption,
            tag: this.props.tag,
            video_id: this.props.video_id,
            video_url: this.props.video_url
        });
    },

    render() {
        var src = this.state.display_img;
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
                    <div>註解: {this.state.caption}</div>
                    <div>書籤位置: {this.state.tag}</div>
                    <div>Youtube 網址: {this.state.video_url}</div>
                </div>
                <Modal isOpen={this.state.editing}
                    onRequestClose={this.closeModal}>
                    <span className="glyphicon glyphicon-remove close" onClick={this.closeModal} />
                    <form className="form-horizontal" onSubmit={this.handleSubmit} style={{margin: "20px auto", width: "80%"}}>
                        <div className="form-group">
                            <img src={src} style={{marginBottom: "5px", width: "150px"}} />
                            <input type="file" onChange={this.handleChangeImg} />
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
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete} style={{marginRight: "10px"}}>刪除</button>
                            <button type="button" className="btn btn-default" onClick={this.closeModal}>取消</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );

    }
});
