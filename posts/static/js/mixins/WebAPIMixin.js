'use strict';

import request from 'superagent';

export default {

    /**
     * gets categories from the server
     * @param {function} cb
     */
    getCategories(parent, cb) {
        var qs = parent ? '&parent=' + parent : '&parent__isnull=true';
        request.get('/api/v1/category/?format=json' + qs)
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
    getPosts(url, category_id, subcategory_id, cb) {
        if (url==null) {
            var suffix = "";
            if(subcategory_id) {
                suffix = '&category=' + subcategory_id;
            } else if(category_id) {
                suffix = '&category__parent=' + category_id;
            };
            url = '/api/v1/posts/?format=json' + suffix
        }
        request.get(url)
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
    },

    searchPosts(url, query, cb) {
        if(url == null) {
            url = '/_search?q=' + query;
        }
        request.get(url)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    }

};