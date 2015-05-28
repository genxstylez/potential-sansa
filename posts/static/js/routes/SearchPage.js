'use strict';

import React from 'react/addons';
import _ from 'lodash';
import classnames from 'classnames';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import SearchSubNavBar from '../components/SubNav/SearchSubNavBar';
import SearchPostList from '../components/SearchPostList';
import Footer from '../components/Footer';
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

export default React.createClass({
    mixins: [],

    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            labelMessage: <p>
                <span style={{fontSize:"22px", letterSpacing:"0.05em"}}>Type and hit enter to search</span>
                <br />
                <span style={{fontSize:"17px", letterSpacing:"0.05em"}}>請輸入欲搜尋字串並按下Enter</span>
                </p>,
            q: this.context.router.getCurrentQuery().q,
            has_value: false,
        }
    },

    componentDidMount() {
        this.setState({
            q: this.context.router.getCurrentQuery().q
        });
    },
    componentWillReceiveProps(){
        this.setState({
            q: this.context.router.getCurrentQuery().q
        });
        setTimeout( () => {
            React.findDOMNode(this.refs.query_input).focus();
        }, 500)
    },
    handeClickOnCross() {
       if(!this.context.router.goBack()) {
            this.context.router.transitionTo('/')
       }
    },
    handleSubmit(e) {
        e.preventDefault();
        var query_input = React.findDOMNode(this.refs.query_input).value.trim();
        this.context.router.transitionTo('search', null, {'q': query_input});
        this.setState({
            q: query_input,
            has_value: false
        });

        React.findDOMNode(this.refs.query_input).value = "";
    },
    handleOnChange(e) {
        this.setState({
            has_value: e.target.value != ""
        });
    },
    handleOnClickPage() {
        React.findDOMNode(this.refs.query_input).focus();
    },
    render() {
        var search_layer_class = classnames({
            'search-layer': true,
            'show': this.state.q == null
        });

        return (
            <TransitionGroup transitionName="post">
                <div key="search-page" ref="container" onClick={this.handleOnClickPage}>
                    <div className={search_layer_class}>
                        <span className="close">
                            <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                        </span>
                        <form className="search-form" onSubmit={this.handleSubmit}>
                            <input 
                                ref="query_input" 
                                name="q" 
                                type="text" 
                                autoComplete="off" 
                                autoFocus={true} 
                                onChange={this.handleOnChange}/>
                            <label>{this.state.has_value ? "" : this.state.labelMessage}</label>
                        </form>
                    </div>
                    <Logo /> 
                    <NavBar />
                    <BannerList />
                    <SearchSubNavBar query={this.state.q}/>
                    <SearchPostList ref="postlist" query={this.state.q} />
                    <Footer /> 
                </div>
            </TransitionGroup>
        );
    }

});