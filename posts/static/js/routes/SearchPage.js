'use strict';

import React from 'react/addons';
import _ from 'lodash';
import NavBar from '../components/MainNav/NavBar';
import Logo from '../components/Logo';
import BannerList from '../components/Banner/BannerList';
import SearchSubNavBar from '../components/SubNav/SearchSubNavBar';
import SearchPostList from '../components/SearchPostList';
import Footer from '../components/Footer';

export default React.createClass({
    mixins: [],

    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            q: this.context.router.getCurrentQuery().q,
        }
    },
    _ScrollDown() {
        var query = this.context.router.getCurrentQuery().q;
        setTimeout( () => {
            if (query && $('.tile').length > 0)
                window.scrollTo(0, 600);
        }, 200)
    },
    componentDidMount() {
        this.setState({
            q: this.context.router.getCurrentQuery().q
        });
        this._ScrollDown();
    },
    componentWillReceiveProps(){
        this.setState({
            q: this.context.router.getCurrentQuery().q
        });
        setTimeout( () => {
            React.findDOMNode(this.refs.query_input).focus();
        }, 500)
    },
    componentWillUpdate() {
        this._ScrollDown();
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
            q: query_input
        });

        React.findDOMNode(this.refs.query_input).value = "";
    },
    render() {
        var search_layer_class = this.state.q == null ? "search-layer show": "search-layer"; 

        return (
            <div ref="container">
                <div className={search_layer_class}>
                    <span className="close">
                        <img src={STATIC_URL + "img/cross.png"} onClick={this.handeClickOnCross} />
                    </span>
                    <form className="search-form" onSubmit={this.handleSubmit}>
                        <input ref="query_input" name="q" type="text" autoComplete="off" autoFocus={true} />
                        <label>Type and hit enter to search</label>
                    </form>
                </div>
                <Logo /> 
                <NavBar />
                <BannerList />
                <SearchSubNavBar query={this.state.q}/>
                <SearchPostList ref="postlist" query={this.state.q} />
                <Footer /> 
            </div>
        );
    }

});