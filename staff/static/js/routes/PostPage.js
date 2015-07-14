'use strict';

import React from 'react/addons';
import _ from 'lodash';
import WebAPIMixin from '../mixins/APIMixin';
var State = require('react-router').State;
import PostContent from '../components/PostContent';
//import ShootingContent from '../components/Post/Shooting/ShootingContent';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Navigation = require('react-router').Navigation;

export default React.createClass({
    mixins: [WebAPIMixin, State, Navigation],

    propTypes: {
        id: React.PropTypes.number
    },

    getInitialState() {
        return {
            id: 0,
            heading: '',
            subheading: '',
            articletext: '',
            imgs: [],
            credits: [],
            created_at: '',
            last_modified: '',
            is_shooting: false,
            uri: '',
        }
    },

    _getPost(Id) {
        this.getPost(Id, (error, response) => {
            var post = error ? [] : response.body;
            this.setState({
                id: post.id,
                heading: post.heading,
                subheading: post.subheading,
                articletext: post.articletext,
                imgs: post.images,
                credits: post.credits,
                created_at: post.created_at,
                last_modified: post.last_modified,
                category: post.category.name,
                uri: post.resource_uri,
                is_shooting: post.is_shooting,
                starred: post.starred,
                published: post.published
            });
        });
    },

    componentDidMount() {
        this._getPost(this.props.id || this.getParams().postId);
    },

    handleClickOnCross() {
        if(this.props.id) {
            this.props.onClickOnCross();
        } else {
            if(!this.goBack()) {
                this.transitionTo('/')
            }
       }
    },

    render() {
        /*
        if(this.state.is_shooting) {
            return (
                <TransitionGroup transitionName="post">
                    <ShootingContent 
                        key={this.state.id}
                        id={this.state.id} 
                        heading={this.state.heading}
                        subheading={this.state.subheading}
                        articletext={this.state.articletext}
                        imgs={this.state.imgs}
                        credits={this.state.credits}
                        created_at={this.state.created_at}
                        last_modified={this.state.last_modified}
                        category={this.state.category}
                        starred={this.state.starred}
                        published={this.state.published}
                        onClickOnCross={this.handleClickOnCross} />
                </TransitionGroup>
                )
        }*/
        return (
            <TransitionGroup transitionName="post">
                <PostContent 
                    key={this.state.id}
                    id={this.state.id} 
                    heading={this.state.heading}
                    subheading={this.state.subheading}
                    articletext={this.state.articletext}
                    imgs={this.state.imgs}
                    credits={this.state.credits}
                    created_at={this.state.created_at}
                    last_modified={this.state.last_modified}
                    category={this.state.category}
                    starred={this.state.starred}
                    published={this.state.published}
                    onClickOnCross={this.handleClickOnCross} />
            </TransitionGroup>
        );
    }

});