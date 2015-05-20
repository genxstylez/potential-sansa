'use strict';

import request from 'superagent';

export default {

    /**
     * gets categories from the server
     * @param {function} cb
     */
    getCategories(cb) {
        request.get('/api/v1/category/')
            .query('format=json')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },
    
    getStarred(cb) {
        request.get('/api/v1/starred/?format=json')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },
    /**
     * get all/categorised posts from the server
 * @param {number} id
     * @param {function} cb
     */
    getPosts(category_id, subcategory_id, cb) {
        var qs = '';
        if(subcategory_id) {
            qs = '&category=' + subcategory_id;
        } else if(category_id) {
            qs = '&category__parent=' + category_id;
        };
        request.get('/api/v1/posts/')
            .query('format=json')
            .query(qs)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getMorePosts(url, cb) {
        request.get(url)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getAlbums(cb) {
        request.get('/api/v1/albums/')
            .query('format=json')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getMoreAlbums(url, cb) {
        request.get(url)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getAlbum(id, cb) {
        request.get('/api/v1/albums/' + id + '/')
        .query('format=json')
        .type('application/json')
        .accept('application/json')
        .end(cb)
    },


    /**
     * get post detail from the server
     * @param {number} id
     * @param {function} cb
     */
    getPost(id, cb) {
        request.get('/api/v1/posts/' + id + '/?format=json')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    searchPosts(url, query, cb) {
        if(url == null) {
            url = '/_search?q=' + query;
        }
        request.get(url)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    createSubscriber(value, cb) {
        request.post('/api/v1/subscribers/')
            .send({ email: value})
            .type('application/json')
            .accept('application/json')
            .end(cb);
    }

};