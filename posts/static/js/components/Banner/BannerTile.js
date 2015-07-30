'use strict';

import React from 'react/addons';
import _ from 'lodash';
import truncate from 'html-truncate';
import WebAPIMixin from '../../mixins/WebAPIMixin';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        cover: React.PropTypes.object.isRequired,
    },
    generate_embed() {
        var width = 640;
        var height = 450;

        return '<iframe width="' + width + '" height="' + height + '" ' +
                'src="https://www.youtube.com/embed/' + this.props.cover.video_id + '" ' +
                'frameborder="0" allowfullscreen></iframe>';
    },
    render() {
        var imgNode = this.props.cover.video_id ? 
            <div key={this.props.cover.video_id} className="video-embed" dangerouslySetInnerHTML={{__html: this.generate_embed()}} /> :  
            <img src={this.props.cover.img !== undefined ? this.props.cover.img.large : ''} />
        return (
            <div className="banner-tile" onClick={this.props.onClick}>
                {imgNode}
                <div className="title">
                        {this.props.heading}
                        <span className="circle-divider"></span>
                        {this.props.subheading}
                </div>
            </div>
        );
    }
});