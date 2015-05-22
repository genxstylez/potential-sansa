'use strict';

import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';
var Navigation = require('react-router').Navigation;



export default React.createClass({
    mixins: [Navigation],

    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string,
        imgs: React.PropTypes.array.isRequired,
        credits: React.PropTypes.object,
        created_at: React.PropTypes.string,
        last_modified: React.PropTypes.string,
    },
    getInitialState() {
        return ({
            cover: {}
        })
    },
    componentDidMount() {
        if (this.props.imgs.length > 0) {
            this.setState({
                cover: this.props.imgs[0]
            });
        };
        if(this.isMounted()) {
            setTimeout(() => {
                $(React.findDOMNode(this.refs.articleContent)).jScrollPane();
                var wyp = new Waypoint({
                    element: document.getElementsByTagName('sup')[0],
                    handler: function() {
                        console.log('123123123');
                    },
                    context: document.getElementById('articleContent')
                });
                $('.credit').waypoint(function() {
                    console.log('credit');
                }, {
                    context: '#articleContent'
                });
            }, 50);
        };
        window.addEventListener('resize', this.handleResize);


    },
    
    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
    },

    handleResize() {
        if($(React.findDOMNode(this.refs.articleContent)).data('jsp') != undefined)
            $(React.findDOMNode(this.refs.articleContent)).data('jsp').reinitialise();
    },

    handeClickOnCross() {
       if(!this.goBack()) {
            this.transitionTo('/')
       }
    },

    render() {
        const creditNodes = _.map(this.props.credits, (value, key) => {
            return (
                <PostCredit key={key} role={key} names={value}/>
            );
        });

        return (
            <div className="article-box" ref="articleBox">
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                </span>
                <div className="row article-header">
                    <span className="circle-divider"></span>
                    {this.props.category}
                    <span className="circle-divider"></span>
                </div>
                <div className="row article">
                    <div id="articleContent" className="pull-left article-content" ref="articleContent">
                        <div className="inner-content">
                            <span className="label category">{this.props.category}</span>
                            <p className="title">{this.props.heading}</p>
                            <p className="sub-title">{this.props.subheading}</p>
                            <div className="decorations">
                                <span className="created_at">{moment(this.props.created_at).format("YYYY.MM.DD")}</span>
                            </div>
                            <div className="text" dangerouslySetInnerHTML={{__html: this.props.articletext}} />
                            <div className="decorations end"></div>
                            {creditNodes}
                            <div className="share">
                                <a href="http://facebook.com">
                                    <img src={STATIC_URL + "img/fb.png"} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <PostGallery imgs={this.props.imgs} on_deck={this.state.cover}/>
                    <div className="triangle"></div>
                </div>
            </div>
        );
    }
});