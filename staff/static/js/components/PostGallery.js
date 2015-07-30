'use strict';

import React from 'react/addons';
import _ from 'lodash';
import APIMixin from '../mixins/APIMixin';
import EditableImg from './EditableImg';
var Modal = require('react-modal');
var Dropzone = require('react-dropzone');


export default React.createClass({
    mixins: [APIMixin],

    propTypes: {
        on_deck: React.PropTypes.object.isRequired,
        imgs: React.PropTypes.array.isRequired,
    },

    componentWillReceiveProps(nextProps) {
        if(this.isMounted()) {
            this.setState({
                on_deck: nextProps.on_deck,
                imgs: nextProps.imgs,
            })
        };
        this.forceUpdate();
    },

    _getImages(post_id) {
        this.getImages(post_id, (error, response) => {
            if(!error)
                this.setState({
                    imgs:response.body.objects,
                    on_deck: response.body.objects[0]
                });
        });
    },

    _createImages() {
        var that = this;
        _.forEach(this.state.files, file => {
            that.createImage(that.props.element_uri.replace("posts", "admin_posts"), file, (e) => {
                that.setState({
                    percentage: e.percent
                });
            }, (error, response) => {
                if(response.ok) {
                    that.setState({
                        files: _.rest(that.state.files)
                    });
                    this._getImages(this.props.element_id);
                };
                
            });
        });
        this.setState({
            uploading: false,
        });
        this.toggleAddMode();
    },
    _createVideo(params) {
        this.createVideo(params, (error, response) => {
            if(error) {
                this.props.hasError(); 
            } else {
                this._getImages(this.props.element_id);
                this.toggleAddMode();
            }
        })
    },

    handleClick(image_url) {
        this.setState({on_deck: image_url});
    },
    handleLeftArrow() {
        $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "-=250"
        }, 200);
    },
    handlerRightArrow() {
          $(React.findDOMNode(this.refs.thumbnailsRow)).animate({ 
            scrollLeft: "+=250"
        }, 200);
    },

    toggleAddMode() {
        this.setState({
            adding: !this.state.adding
        });
    },

    handleUpload() {
        this.setState({
            uploading: true,
        });
        this._createImages();
    },

    handleClickAddImage(e) {
        e.preventDefault();
        this.toggleAddMode();
        this.setState({
            add_type: "image"
        });
    }, 

    handleClickAddVideo(e) {
        e.preventDefault();
        this.toggleAddMode();
        this.setState({
            add_type: "video"
        });
    },

    handleChangeVideo(e) {
        this.setState({
            video_url: e.target.value
        });
    },

    handleSubmitVideo(e) {
        e.preventDefault();
        var params = {
            video_url: this.state.video_url,
            post: this.props.element_uri.replace("posts", "admin_posts")
        };
        this._createVideo(params);
    },

    handleDrop(files) {
        this.setState({
            files: this.state.files.concat(files)
        });
    },

    getInitialState() {
        return {
            on_deck: {'id': '99-00-11'},
            imgs: [],
            adding: false,
            add_type: "",
            video_url: "",
            files: [],
            uploading: false,
            percentage: 0
        }
    },
    componentDidMount() {
        this.setState({
            on_deck: this.props.on_deck,
            imgs: this.props.imgs
        });
    },

    render() {
        var modalNode = "";
        if (this.state.add_type == "video") {
            modalNode = <form className="form-horizontal" onSubmit={this.handleSubmitVideo} style={{margin: "20px auto", width: "80%"}}>
                <div className="form-group">
                    <label>Youtube 網址</label>
                    <input className="form-control" type="text" onChange={this.handleChangeVideo} value={this.state.video_url} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" style={{marginRight: "10px"}}>新增</button>
                    <button type="button" className="btn btn-default" onClick={this.toggleAddMode}>取消</button>
                </div>
            </form> 
        } else {
            if(this.state.add_type == "image")
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
                modalNode = <div style={{height: "100%", width: "100%"}}>
                    <Dropzone onDrop={this.handleDrop} accept="image/jpeg, image/gif, image/jpg, image/png"
                        style={{cursor: "pointer", width:"80%", height: "20%", border:"2px dashed #c8c8c8", margin: "0 auto", "color": "#c8c8c8"}}>
                        <div style={{position: "absolute", fontSize:"18px", top:"11%", left: "25%"}}>請將欲上傳圖片拖曳至此或點擊此框選取檔案</div>
                    </Dropzone>
                    {fileNode}
                </div>
        }
        
        return (
            <div className="pull-right gallery">
                <div className="btn-group" style={{position:"absolute", left:"10px", zIndex: "999", top:"-25px"}}>
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">新增</button>
                    <ul className="dropdown-menu">
                        <li><a href="#" onClick={this.handleClickAddImage}>圖片</a></li>
                        <li><a href="#" onClick={this.handleClickAddVideo}>影片</a></li>
                    </ul>
                </div>
                <EditableImg key={this.state.on_deck.id} 
                    image={this.state.on_deck} 
                    post_id={this.props.element_id} 
                    post_uri={this.props.element_uri} 
                    refreshImage={this._getImages} />
                <div className="arrow left" onClick={this.handleLeftArrow}>
                    <span className="align-helper" />
                    <img src={STATIC_URL + "img/left-arrow.png"} />
                </div>
                <ul className="thumbnails" ref="thumbnailsRow">
                    {this.state.imgs.map(function(image) {
                        var src = _.has(image.img, 'small') ? image.img.small: "";
                        if (image.video_id) {
                            src = "https://i.ytimg.com/vi/" + image.video_id + "/hqdefault.jpg"
                        }
                        return (
                            <li key={image.id}>
                                <img src={src} 
                                    onClick={this.handleClick.bind(this, image)} />
                            </li>
                        )
                    }, this)}
                </ul>
                <div className="arrow right" onClick={this.handlerRightArrow}>
                    <span className="align-helper" />
                    <img src={STATIC_URL + "img/right-arrow.png"} />
                </div>
                <Modal isOpen={this.state.adding} onRequestClose={this.toggleAddMode}>
                    {modalNode}
                </Modal>
            </div>
        );
    }
});