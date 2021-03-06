'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import Router from 'react-router';
import WebAPIMixin from '../../mixins/WebAPIMixin';
import moment from 'moment';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
        created_at: React.PropTypes.string.isRequired,
        last_modified: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string,
    },
    generate_embed() {
        var width = $('.tile').width();
        var height = width / 1.5;

        return '<iframe width="' + width + '" height="' + height + '" ' +
                'src="https://www.youtube.com/embed/' + this.props.cover.video_id + '" ' +
                'frameborder="0" allowfullscreen></iframe>';
    },

    render() {
        var imgNode = this.props.cover.video_id ? 
            <div key={this.props.cover.video_id} className="video-embed" dangerouslySetInnerHTML={{__html: this.generate_embed()}} /> :  
            <img src={this.props.cover.img !== undefined ? this.props.cover.img.large : ''} />
        return (
            <div className="tile" onClick={this.props.onClick}>
                {imgNode}
                <div className="intro">
                    <div className="info">
                        { this.props.category} | {moment(this.props.created_at).format("YYYY.MM.DD")}
                    </div>
                    <div className="heading">
                        {this.props.heading}
                    </div>
                    <div className="sub-heading">
                        {this.props.subheading}
                    </div>

                    <div className="divider">
                        <span className="twin circle-divider"></span>
                        <span className="twin circle-divider"></span>
                    </div>

                    <div className="synopsis"
                        dangerouslySetInnerHTML={{__html: truncate(this.props.articletext, 50)}}>
                    </div>
                </div>
                <div className="triangle"></div>
            </div>
        );
    }
});