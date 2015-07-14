'use strict';

import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import PostCredit from './PostCredit';
import PostGallery from './PostGallery';
import classNames from 'classnames';
import ClickableP from './ClickableP';
import ToggableIcon from './ToggableIcon';
import DropdownSpan from './DropdownSpan';
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
            cover: {id:0},
            hasError: false
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
    },
    componentWillUnmount () {
        Waypoint.destroyAll();
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
    },

    hasError() {
        this.setState({
            hasError: true
        });
        setTimeout(() => {
            this.setState({
                hasError: false
            });
        }, 3000);
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

        const alert_cls = classNames({
            'alert': true,
            'alert-danger': true,
            'hidden': !this.state.hasError
        });
        const alert_style = {
            position: "absolute",
            width: "90%",
            left: "5%",
            top: "0%"
        }
        const alert_close_style = {
            position: "relative",
            top: "-2px",
            right: "-21px"
        }
        return (
            <div className="article-box" ref="articleBox">
                <span className="close">
                    <img src={STATIC_URL + "img/cross.png"} onClick={this.props.onClickOnCross} />
                </span>
                <div className="row article-header">
                    <span className="circle-divider"></span>
                    編輯模式
                    <span className="circle-divider"></span>
                </div>
                <div className="row article">
                    <div className={alert_cls} style={alert_style} role="alert" ref="alert">
                        發生錯誤, 請再嘗試一次
                    </div>
                    <div id="articleContent" className={articleContent_class} ref="articleContent">
                        <div className="inner-content">
                            <ToggableIcon tooltip="加入至橫幅"className="glyphicon glyphicon-star" name="starred" element_id={this.props.id} selected={this.props.starred} />
                            <ToggableIcon tooltip="發表" className="glyphicon glyphicon-ok" name="published" element_id={this.props.id} selected={this.props.published} />
                            <br />
                            <br />
                            <DropdownSpan className="label category" name="category" element_id={this.props.id} content={this.props.category} />
                            <ClickableP className="title" 
                                element_id={this.props.id} name="heading" 
                                content={this.props.heading} hasError={this.hasError} />
                            <ClickableP className="sub-title" element_id={this.props.id} name="subheading" 
                                content={this.props.subheading} hasError={this.hasError} />
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