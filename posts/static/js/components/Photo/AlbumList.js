'use strict';

import React from 'react/addons';
import _ from 'lodash';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import ScrollListenerMixin from '../../mixins/ScrollListenerMixin';
import AlbumTile from './AlbumTile';
import MansonryMixin from 'react-masonry-mixin';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

const Link = Router.Link;

const mansonryOptions = {
    transitionDuration: '0.2s'
}

export default React.createClass({
    mixins: [MansonryMixin('mansonryAlbumContainer', mansonryOptions), WebAPIMixin, ScrollListenerMixin],

    getInitialState() {
        return {
            albums: [],
            next_page : null,
            has_next: false,
            is_loading: false,
        }
    },

    onPageScroll() {
        var bottomOffset = React.findDOMNode(this.refs.mansonryContainer).scrollHeight - this.state.scrollTop;
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
                
    _getAlbums() {
        this.getAlbums((error, response) => {
            this.processResponse(error, response);
        });
    },

    componentDidMount() {
        this._getAlbums();
    },

    render() {
        const AlbumTileNodes = _.map(this.state.albums, album => {
            return (
                <AlbumTile 
                    key={album.id} 
                    id={album.id} 
                    cover={album.cover}
                    created_at={album.created_at}
                    last_modified={album.last_modified} />
            );
        });
        return (
            <div id="album-tiles" className="mansonryAlbumContainer" ref="mansonryAlbumContainer">
                {AlbumTileNodes}
            </div>
        );
    }

});