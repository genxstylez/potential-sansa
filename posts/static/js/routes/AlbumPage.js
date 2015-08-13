'use strict';

import React from 'react/addons';
import _ from 'lodash';
import AlbumContent from '../components/Photo/AlbumContent';
import LicenseFooter from '../components/Photo/LicenseFooter';
import WebAPIMixin from '../mixins/WebAPIMixin';
var State = require('react-router').State;

export default React.createClass({
    mixins: [WebAPIMixin, State],

    getInitialState() {
        return ({
            id: 0,
            name: '',
            zh_name: '',
            photos: [],
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
                    concept: response.body.concept
                });
        });
    },
    componentDidMount() {
        this._getAlbum(this.getParams().albumId);
    },
    render() {

        return (
            <div style={{height: "100%"}}>
                <AlbumContent key={this.state.id}
                    id={this.state.id}
                    name={this.state.name}
                    zh_name={this.state.zh_name}
                    photos={this.state.photos} 
                    photographer={this.state.photographer}
                    concept={this.state.concept} />
                <LicenseFooter 
                    photographer={this.state.photographer}
                    concept={this.state.concept} />
            </div>
        );
    }

});