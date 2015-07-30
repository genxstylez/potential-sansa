'use strict';

import React from 'react/addons';
import _ from 'lodash';
import APIMixin from '../mixins/APIMixin';
var State = require('react-router').State;
var Navigation = require('react-router').Navigation;
var Dropzone = require('react-dropzone');
var Modal = require('react-modal');

export default React.createClass({
    mixins: [APIMixin, State, Navigation],

    getInitialState() {
        return ({
            id: 0,
            name: '',
            zh_name: '',
            photos: [],
            adding: false,
            selected_photo: null,
            files: [],
            resource_uri: "",
            redactor_inited: false,
            display_img: null,
            img_changed: false
        });
    },
    
    _getAlbum(id) {
        this.getAlbum(id, (error, response) => {
            if(response.body)
                this.setState({
                    id: response.body.id,
                    photos: this.state.photos.concat(response.body.photos),
                    name: response.body.name,
                    zh_name: response.body.zh_name,
                    photographer: response.body.photographer,
                    resource_uri: response.body.resource_uri
                });
        });
    },

    refreshAlbum(id) {
        this.getAlbum(id, (error, response) => {
            if(response.body)
                this.setState({
                    id: response.body.id,
                    photos: response.body.photos,
                    name: response.body.name,
                    zh_name: response.body.zh_name,
                    photographer: response.body.photographer,
                    resource_uri: response.body.resource_uri
                });
        });
    },

    _updateAlbum(id, params) {
        this.updateAlbum(id, params, (error, response) => {
            if(!error) {
                $(React.findDOMNode(this.refs.SubmitButton)).button('reset');
            }
        });
    },

    _updatePhoto(id, img, caption) {
        this.updatePhoto(id, img, caption, this.state.resource_uri.replace("albums", "admin_albums"), 
            this.state.img_changed, (error, response) => {
                if(!error) {
                    this.setState({
                        img_changed: false
                    });
                    this.refreshAlbum(this.state.id);
                    this.closeEditModal();
                }
        });
    },
    _deletePhoto(id) {
        this.deletePhoto(id, (error, response) => {
            if(!error) {
                this.refreshAlbum(this.state.id);
                this.closeEditModal();
            }
        });
    },

    _deleteAlbum(id) {
        this.deleteAlbum(id, (error, response) => {
            if(!error) {
                this.handleClickOnCross()
            }
        });
    },

    _createPhotos() {
        var that = this;
        _.forEach(this.state.files, file => {
            that.createPhoto(that.state.resource_uri.replace("albums", "admin_albums"), file, (error, response) => {
                if(!error) {
                    that.setState({
                        files: _.rest(that.state.files)
                    });
                    this.refreshAlbum(this.state.id);
                };
                
            });
        });
        this.toggleAddMode();
    },

    componentDidMount() {
        this._getAlbum(this.getParams().albumId);
        $('.collapse').collapse();
    },

    handleClickOnPhoto(photo) {
        this.setState({
            selected_photo: photo,
            display_img: photo.img.small
        });
    },

    toggleAddMode() {
        this.setState({
            adding: !this.state.adding
        });
    },

    handleDrop(files) {
        this.setState({
            files: this.state.files.concat(files)
        });
    },

    handleUpload() {
        this._createPhotos();
    },

    handleChangeEN(e) {
        var value = e.target.value != "" ? e.target.value: this.state.name;
        this.setState({
            name: value
        });
    },

    handleKeyUpEN(e) {
        if(e.key==='Enter')
            this.handleSubmit();
    },

    handleChangeZH(e) {
        var value = e.target.value != "" ? e.target.value: this.state.zh_name;
        this.setState({
            zh_name: value
        });
    },

    handleKeyUpZH(e) {
        if(e.key==='Enter')
            this.handleSubmit();
    },

    changePhotographer(value) {
        var val = value != "" ? value: this.state.photographer;
         this.setState({
            photographer: val
        });
    },

    handleSubmit(e) {
        $(React.findDOMNode(this.refs.SubmitButton)).button('loading');
        this._updateAlbum(this.state.id, {
            "name": this.state.name,
            "zh_name": this.state.zh_name,
            "photographer": this.state.photographer
        });
    },

    handleClickOnCross() {
        if(!this.goBack()) {
            this.transitionTo('/staff/albums/')
        }
    },

    handleChangeCaption(e) {
        this.setState({
            selected_photo : {
                id: this.state.selected_photo.id,
                img: this.state.selected_photo.img,
                caption: e.target.value
            }
        });
    },

    handleChangeImg(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0]
        reader.onload = function(upload) {
            self.setState({
                selected_photo:{
                    id: self.state.selected_photo.id,
                    img: file,
                    caption: self.state.selected_photo.caption
                },
                display_img: upload.target.result,
                img_changed: true
            });
        }

        reader.readAsDataURL(file);
    },

    handleDeletePhoto() {
        var res = confirm('確定要刪除此圖片？');
        if (res)
            this._deletePhoto(this.state.selected_photo.id);
    },

    handleDeleteAlbum() {
        var res = confirm('確定要刪除此相簿？');
        if (res)
            this._deleteAlbum(this.state.id);
    },

    handleSubmitPhoto(e) {
        e.preventDefault();
        this._updatePhoto(this.state.selected_photo.id, this.state.selected_photo.img, this.state.selected_photo.caption);
    },

    closeEditModal() {
        this.setState({
            selected_photo: null
        });
    },

    componentDidUpdate() {
        if(!this.state.redactor_inited) {
            var that = this;
            $(React.findDOMNode(this.refs.TextArea)).redactor({
                'lang': 'zh_tw',
                'minHeight': '300px',
                'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor', 'formatting'],
                'plugins': ['scriptbuttons', 'fullscreen'],
                'changeCallback': function() {
                    that.changePhotographer(this.code.get());
                },
                initCallback: function() {
                    that.setState({
                        redactor_inited: true
                    });
                }
            });
        }
    },

    render() {
        var fileNode = ""
        if(this.state.files.length > 0) {
            fileNode = <div style={{width: "80%", margin: "50px auto"}}>
                <button onClick={this.handleUpload} type="button" className="btn btn-primary" style={{marginBottom: "10px", marginTop: "-52px"}}>上傳</button>
                <div className="progress" style={{display: this.state.uploading ? "block": "none"}}>
                    <div className="progress-bar" role="progressbar" style={{width: this.state.percentage + "%"}} />
                </div>
                <div className="list-group">
                {this.state.files.map(function(file) {
                    return(<a href="#" key={file.name} className="list-group-item">{file.name}</a>);
                }, this)}
                </div>
            </div>
        }
        const PhotosNode =  _.map(this.state.photos, photo => {
            return (
                <div key={photo.id}>
                    <img src={photo.img.small} 
                        onClick={this.handleClickOnPhoto.bind(this, photo)} />
                </div>
            );
        });
        return (
            <div style={{marginTop:"50px"}}>
                <span className="close" style={{margin: "-40px 20px"}}>
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.handleClickOnCross} />
                </span>
                <div className="col-lg-offset-2 col-md-offset-md-2 col-sm-offset-2 col-lg-8 col-md-8 col-sm-8 albums" ref="Album">
                    <div className="panel-group" role="tablist" aria-multiselectable="true">
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="ENname">
                                <span style={{fontSize: "24px", margin: "0 auto" }} className="panel-title">編輯{this.state.name}</span>
                                <div className="btn-group pull-right">
                                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteAlbum} style={{marginRight: "10px"}}>刪除</button>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="form-label">英文標題</label>
                                    <input
                                        name="zh_name"
                                        style={{margin: "10px 0"}} 
                                        className="form-control" 
                                        type="text" 
                                        value={this.state.name}
                                        onChange={this.handleChangeEN}
                                        onKeyUp={this.handleKeyUpEN} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">中文標題</label>
                                     <input
                                        name="zh_name"
                                        style={{margin: "10px 0"}} 
                                        className="form-control" 
                                        type="text" 
                                        value={this.state.zh_name}
                                        onChange={this.handleChangeZH}
                                        onKeyUp={this.handleKeyUpZH} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">攝影</label>
                                    <span>
                                        <textarea
                                            ref="TextArea"
                                            name="photographer"
                                            defaultValue="關於攝影師"
                                            value={this.state.photographer} />
                                        <p className="help-block">若要換行請輸入shift+enter, 分段落請輸入enter</p>
                                    </span>
                                </div>
                                <button onClick={this.handleSubmit} 
                                    ref="SubmitButton"
                                    className="btn btn-primary" data-loading-text="儲存中..." type="submit">儲存</button>
                            </div>
                        </div>
                    </div>
                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="photos">
                                <h4 className="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsePhotos" aria-expanded="true" aria-controls="collapseOne">
                                        圖片
                                    </a>
                                </h4>
                            </div>
                            <div id="collapsePhotos" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="photos">
                                <div className="panel-body">
                                    <div className="flex-box">
                                        {PhotosNode} 
                                    </div>
                                    <button className="btn btn-info" type="button" onClick={this.toggleAddMode}>新增圖片</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.adding} onRequestClose={this.toggleAddMode}>
                        <Dropzone onDrop={this.handleDrop} accept="image/jpeg, image/gif, image/jpg, image/png"
                            style={{cursor: "pointer", width:"80%", height: "200px", border:"2px dashed #c8c8c8", margin: "0 auto", "color": "#c8c8c8"}}>
                            <div style={{fontSize:"18px", marginTop:"80px", textAlign: "center"}}>請將欲上傳圖片拖曳至此或點擊此框選取檔案</div>
                        </Dropzone>
                        {fileNode}
                    </Modal>
                    <Modal isOpen={this.state.selected_photo != null}
                        onRequestClose={this.closeEditModal}>
                        <span className="glyphicon glyphicon-remove close" onClick={this.closeEditModal} />
                        <form className="form-horizontal" onSubmit={this.handleSubmitPhoto} style={{margin: "20px auto", width: "80%"}}>
                            <div className="form-group">
                                <img src={this.state.display_img} style={{marginBottom: "5px", width: "150px"}} />
                                <input type="file" accept="image/jpeg, image/gif, image/jpg, image/png" onChange={this.handleChangeImg} />
                            </div>
                            <div className="form-group">
                                <label>註解</label>
                                <input className="form-control" type="text" onChange={this.handleChangeCaption} 
                                    value={_.has(this.state.selected_photo, 'caption') ? this.state.selected_photo.caption : ""} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" style={{marginRight: "10px"}}>儲存</button>
                                <button type="button" className="btn btn-danger" onClick={this.handleDeletePhoto} style={{marginRight: "10px"}}>刪除</button>
                                <button type="button" className="btn btn-default" onClick={this.closeEditModal}>取消</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }

});