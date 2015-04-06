'use strict';

import request from 'superagent';

export default {

    /**
     * gets (all) main categories from the server
     * @param {function} cb
     */
    getCategories(cb) {
        request.get('/api/v1/category/?format=json&parent__isnull=true')
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
    getPosts(id, cb) {
        var suffix = id ? '&category=' + id : '';
        request.get('/api/v1/posts/?format=json' + suffix)
            .type('application/json')
            .accept('application/json')
            .end(cb);
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
    }

};