'use strict';

import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';
import classNames from 'classnames';
var Navigation = require('react-router').Navigation;

export default React.createClass({
    mixins: [Navigation],

    propTypes: {
        id: React.PropTypes.number.isRequired,
        heading: React.PropTypes.string.isRequired,
        subheading: React.PropTypes.string.isRequired,
        articletext: React.PropTypes.string,
        imgs: React.PropTypes.array.isRequired,
        credits: React.PropTypes.array,
        created_at: React.PropTypes.string,
        last_modified: React.PropTypes.string,
    },
    getInitialState() {
        return ({
            overflow: false,
            cover: {id:0}
        })
    },
    _setCover(index) {
        const that = this;
        _.forEach(this.props.imgs, function(img){
            if(img.tag == index)
                that.setState({
                    cover: img
                });
        });
    },
    componentDidMount() {
        const that = this;
        if (this.props.imgs.length > 0) {
            this.setState({
                cover: this.props.imgs[0]
            });
        };
        if(this.isMounted()) {
            const articleContent = React.findDOMNode(this.refs.articleContent);
            this.setState({
                overflow: articleContent.offsetHeight < articleContent.scrollHeight            
            });
            setTimeout(() => {
                var supscripts = document.getElementsByTagName('sup')
                _.forEach(supscripts, function(sup){
                    new Waypoint({
                        element: sup,
                        handler: function() {
                            var index = parseInt(this.element.innerHTML);
                            if(typeof index === 'number')
                                that._setCover(index);
                        },
                        context: articleContent,
                        offset: '0px'
                    });
                });
            }, 1000);
        };

        //window.addEventListener('resize', this.handleResize);

    },
    componentWillUnmount () {
        Waypoint.destroyAll();
        //window.removeEventListener('resize', this.handleResize);
    },

    /* 
    handleResize() {
        if($(React.findDOMNode(this.refs.articleContent)).data('jsp') != undefined)
            $(React.findDOMNode(this.refs.articleContent)).data('jsp').reinitialise();
    },
    */

    handeClickOnCross() {
       if(!this.goBack()) {
            this.transitionTo('/')
       }
    },

    render() {
        const creditNodes = _.map(this.props.credits, credit => {
            return (
                <PostCredit key={credit.id} role={credit.role} name={credit.name} />
            );
        });
        const articleContent_class = classNames({
            'pull-left': true,
            'article-content': true,
            'overflow': this.state.overflow
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
                    <div id="articleContent" className={articleContent_class} ref="articleContent">
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
                                <a href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&title=" + this.props.heading}>
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