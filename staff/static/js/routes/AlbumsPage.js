'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import ScrollListenerMixin from '../mixins/ScrollListenerMixin';
import APIMixin from '../mixins/APIMixin';
import ToggableFilter from '../components/ToggableFilter';
import ToggableIcon from '../components/ToggableIcon';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Navigation = require('react-router').Navigation;

const Link = Router.Link;

export default React.createClass({
    mixins: [APIMixin, Navigation, ScrollListenerMixin],

    getInitialState() {
        return {
            albums: [],
            next_page : null,
            has_next: false,
            is_loading: false,
            all_filter: true,
            published_filter: false
        }
    },

    onPageScroll() {
        var bottomOffset = React.findDOMNode(this.refs.mansonryContainer).scrollHeight - window.innerHeight - this.state.scrollTop;
        if (bottomOffset < 300 && !this.state.is_loading && this.state.has_next) {
            this.setState({
                is_loading: true
            });
            this._getMoreAlbums(this.state.next_page);
        }
    },

    processResponse(error, response) {
        var new_elements = error ? [] : response.body.objects,
            next_page = response.body.meta.next, 
            has_next = response.body.meta.next != null; 
        this.setState({
            albums: this.state.albums.concat(new_elements),
            next_page: next_page,
            has_next: has_next,
            is_loading: false,
        });

    },

    _getMoreAlbums(url) {
        this.getMoreAlbums(url, (error, response) => {
           this.processResponse(error, response);
        });
    },
                
    _getAlbums(query) {
        this.getAlbums(query, (error, response) => {
            this.processResponse(error, response);
        });
    },

    componentDidMount() {
        this._getAlbums(null);
    },

    _createNewAlbum() {
        var params = {
            name: "English Heading",
            zh_name: "Chinese Heading",
        };
        this.createAlbum(params, (error, response) => {
            if(!error)
                var album_id = response.headers['location'].split('/')[6]
                this.transitionTo("album", params={albumId: album_id});
        });
    },

    handleClickPublished(bool) {
        this.setState({
            published_filter: bool,
            all_filter: false,
            albums:[]
        });
         this._getAlbums('&published=' + bool);
    },

    handleClickPublishedButton() {
       React.findDOMNode(this.refs.published).click();
    },

    handleClickAll() {
        this.setState({
            all_filter: !this.state.all_filter,
            albums:[]
        });
         this._getAlbums(null);
    },

    handleClickNew() {
        this._createNewAlbum();
    },

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip()
    },

    handeClickOnCross() {
        if(!this.goBack()) {
            this.transitionTo('/')
       }
    },
    render() {
        const AlbumNodes = _.map(this.state.albums, album => {
            var imgNode = "";
            if(album.cover != null)
                imgNode = <img src={album.cover.img.small} style={{height: "80px", marginRight: "20px"}} />
            return (
                <li key={album.id} className="list-group-item">
                    <Link to="album" params={{albumId:album.id}}>
                        {imgNode}
                        {album.name} {album.zh_name != ""? "/ " + album.zh_name : ""}
                    </Link>
                    <span className="pull-right">
                        <span style={{display: "inline-block", height: "85%", verticalAlign: "middle"}} />
                        <ToggableIcon 
                            tooltip="發表" 
                            style={{lineHeight: album.cover != null ? "70px" : "auto"}}
                            className="glyphicon glyphicon-ok" 
                            name="published" 
                            element_id={album.id} 
                            selected={album.published} />
                </span>
                </li>
            );
        });
        return (
            <div style={{marginTop:"50px"}}>
                <Link style={{position: "fixed", bottom: "20px", left: "20px"}} to="home">
                    <button className="btn-lg btn-primary">文章列表</button>
                </Link>
                <div className="col-lg-offset-2 col-md-offset-md-2 col-sm-offset-2 col-lg-8 col-md-8 col-sm-8 albums" ref="Albums">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span style={{fontSize: "24px", margin: "0 auto" }} className="panel-title">Albums / 相簿</span>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" type="button" onClick={this.handleClickNew}>新相簿</button>
                                <button className={this.state.all_filter ? "btn btn-info" : "btn btn-default"} type="button" onClick={this.handleClickAll}>All</button>
                                <button className="btn btn-default" type="button" onClick={this.handleClickPublishedButton}>
                                    <ToggableFilter selected={this.state.published_filter} className="glyphicon glyphicon-ok" ref="published" onStatus={this.handleClickPublished} />
                                </button>
                            </div>
                        </div>
                        <ul className="list-group">
                            {AlbumNodes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});