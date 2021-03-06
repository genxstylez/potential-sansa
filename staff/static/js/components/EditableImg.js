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
            select_text: "",
            img_changed: false,
            display_img: "",
            redactor_inited: false
        });
    },

    _getImage(id) {
        this.getImage(id, (error, response) => {
            if(error) {
                alert('Please try again!');
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
    _updateImage(id, img, caption, tag, video_url, select_text, post_uri, post_id, changed) {
        this.updateImage(id, img, caption, tag, video_url, select_text, post_uri, post_id, changed, (error, response) => {
            if(error) {
                this.props.hasError(); 
                this.setState({
                    img_changed: false
                });
            } else {
                this._getImage(id);
                this.props.refreshImage(this.props.post_id);
                this.closeModal();
            }
        });
    },

    _deleteImage(id) {
        this.deleteImage(id, (error, response) => {
            if(!error) {
                this.props.refreshImage(this.props.post_id);
                this.closeModal();
            }
        });
    },

    _setCover(id) {
        this.setCover(id, this.props.post_id, (error, response) => {
            if(!error)
                this.props.refreshImage(this.props.post_id);
        });
    },

    handleDelete() {
        var res = confirm('確定要刪除此圖片？');
        if (res)
            this._deleteImage(this.state.id);
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
        this._updateImage(this.state.id,
            this.state.img,
            this.state.caption, 
            this.state.tag,
            this.state.video_url, 
            this.state.select_text,
            this.props.post_uri.replace("posts", "admin_posts"),
            this.props.post_id,
            this.state.img_changed
        );
    },

    handleKeyUp(e) {
        if(e.key==='Enter')
            this.handleOnBlur();
    },

    handleClickCover() {
        this._setCover(this.state.id);
    },

    generate_embed(youtube_id) {
        var width = $('.on_deck').width();
        var height = width / 1.5;

        return '<iframe width="' + width + '" height="' + height + '" ' +
                'src="https://www.youtube.com/embed/' + youtube_id + '" ' +
                'frameborder="0" allowfullscreen></iframe>';
    },

    handleChangeSelectText(value) {
        this.setState({
            select_text: value
        });
    },

    componentDidMount() {
        var img = _.has(this.props.image.img, 'original') ? this.props.image.img.original: "";
        this.setState({
            id: this.props.image.id,
            img: img,
            display_img: img,
            caption: this.props.image.caption,
            tag: this.props.image.tag,
            video_id: this.props.image.video_id,
            video_url: this.props.image.video_url,
            is_cover: this.props.image.is_cover,
            select_text: this.props.image.select_text
        });
    },

    componentWillReceiveProps(nextProps) {
        var img = _.has(nextProps.image.img, 'original') ? nextProps.image.img.original: "";
        this.setState({
            id: nextProps.image.id,
            img: img,
            display_img: img,
            caption: nextProps.image.caption,
            tag: nextProps.image.tag,
            video_id: nextProps.image.video_id,
            video_url: nextProps.image.video_url,
            select_text: nextProps.image.select_text,
            is_cover: nextProps.image.is_cover
        });
    },

    componentDidUpdate() {
        if(!this.state.redactor_inited) {
            setTimeout(() => {
                var that = this;
                $(React.findDOMNode(this.refs.TextArea)).redactor({
                    'lang': 'zh_tw',
                    'focus': 'true',
                    'minHeight': '300px',
                    'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor', 'formatting'],
                    'plugins': ['scriptbuttons', 'fullscreen'],
                    'blurCallback': function() {
                        that.handleChangeSelectText(this.code.get());
                    },
                    initCallback: function() {
                        that.setState({
                            redactor_inited: true
                        });
                    }
                });
            }, 1000);
        }
    },

    render() {
        var src = this.state.display_img;

        var onDeckNode = <img src={this.state.display_img} />
        if (this.state.video_id) {
            src = "https://i.ytimg.com/vi/" + this.state.video_id + "/hqdefault.jpg";
            onDeckNode = <div key={this.state.video_id} className="video-embed" dangerouslySetInnerHTML={{__html: this.generate_embed(this.state.video_id)}} />;
        }
        return (
            <div>
                <button className={this.state.is_cover ? "btn btn-info disabled" : "btn btn-info"}
                    style={{position:"absolute", left:"40%", zIndex: "999", top: "-25px"}} 
                    onClick={this.handleClickCover}>{this.state.is_cover ? "此為封面圖片" : "設定為封面圖片"}</button>
                <button className="btn btn-primary" 
                    style={{position:"absolute", right:"10px", zIndex: "999", top: "-25px"}} 
                    onClick={this.handleClickTile}>編輯圖片</button>
                <div className="on_deck">
                    <span className="align-helper" />
                    {onDeckNode}
                    <div className="caption">{this.state.caption}</div>
                </div>
                <Modal isOpen={this.state.editing}
                    onRequestClose={this.closeModal}>
                    <span className="glyphicon glyphicon-remove close" onClick={this.closeModal} />
                    <form className="form-horizontal" onSubmit={this.handleSubmit} style={{margin: "20px auto", width: "80%"}}>
                        <div className="form-group">
                            <img src={src} style={{marginBottom: "5px", width: "150px"}} />
                            <input type="file" accept="image/jpeg, image/gif, image/jpg, image/png" onChange={this.handleChangeImg} />
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
                            <label>單品敘述</label>
                            <span>
                                <textarea
                                    ref="TextArea"
                                    name="select_text"
                                    defaultValue={this.state.select_text} />
                                <p className="help-block">若要換行請輸入shift+enter, 分段落請輸入enter</p>
                            </span>
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
