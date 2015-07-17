'use strict';

import request from 'superagent';

export default {

    /**
     * gets categories from the server
     * @param {function} cb
     */
    getCategories(cb) {
        request.get('/staff_api/v1/categories/')
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
            .query('limit=50')
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

    updatePost(id, params, cb) {
        request.put('/staff_api/v1/admin_posts/' + id +'/')
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    createCredit(params, cb) {
        request.post('/staff_api/v1/admin_credits/')
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    deleteCredit(id, cb) {
        request.del('/staff_api/v1/admin_credits/' + id + '/')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getImage(id, cb) {
        request.get('/staff_api/v1/admin_images/' + id + '/?format=json')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    updateImage(id, img, caption, tag, video_url, post_uri, post_id, changed, cb) {
        if (changed)
            request.post('/staff_api/v1/admin_images/')
                .attach('img', img)
                .field('id', id)
                .field('caption', caption)
                .field('tag', tag)
                .field('video_url', video_url)
                .field('post', post_uri)
                .accept('application/json')
                .end(cb);
        else {
            var params = {
                id: id,
                caption: caption,
                tag: tag,
                video_url: video_url,
                post: post_id
            };
            request.post('/post_image/edit/')
                .set('X-CSRFToken', csrfToken)
                .type('form')
                .send(params)
                .accept('application/json')
                .end(cb);
        }

    }
};