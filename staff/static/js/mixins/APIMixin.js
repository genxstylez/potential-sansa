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

    createCategory(params, cb) {
        request.post('/staff_api/v1/admin_categories/')
            .set('X-CSRFToken', csrfToken)
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb); 
    },

    deleteCategory(id, cb) {
        request.del('/staff_api/v1/admin_categories/' + id + '/')
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
    getPosts(category_id, subcategory_id, query, cb) {
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
            .query(query)
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

    getAlbums(query, cb) {
        request.get('/api/v1/albums/')
            .query('format=json')
            .query(query)
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

    createPost(params, cb) {
        request.post('/staff_api/v1/admin_posts/')
            .set('X-CSRFToken', csrfToken)
            .send(params)
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

    deletePost(id, cb) {
        request.del('/staff_api/v1/admin_posts/' + id + '/')
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


    updateCredit(id, params, cb){
        request.put('/staff_api/v1/admin_credits/' + id + '/')
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

    createVideo(params, cb) {
        request.post('/staff_api/v1/admin_images/')
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    getImages(post_id, cb)  {
        request.get('/staff_api/v1/admin_images/')
            .query('post=' + post_id)
            .query('format=json')
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

    createImage(post_uri, img, progress_cb, cb) {
        request.post('/staff_api/v1/admin_images/')
            .attach('img', img, img.name)
            .field('post', post_uri)
            .accept('application/json')
            .end(cb)
            .on('progress', progress_cb)
    },

    updateImage(id, img, caption, tag, video_url, select_text, post_uri, post_id, changed, cb) {
        if (changed)
            request.post('/staff_api/v1/admin_images/')
                .attach('img', img, img.name)
                .field('id', id)
                .field('caption', caption)
                .field('tag', tag)
                .field('video_url', video_url)
                .field('select_text', select_text)
                .field('post', post_uri)
                .accept('application/json')
                .end(cb);
        else {
            var params = {
                id: id,
                caption: caption,
                tag: tag,
                video_url: video_url,
                select_text: select_text,
                post: post_id
            };
            request.post('/post_image/edit/')
                .set('X-CSRFToken', csrfToken)
                .type('form')
                .send(params)
                .accept('application/json')
                .end(cb);
        }

    },

    setCover(id, post_id, cb) {
        var params = {
            id: id,
            post_id,
            is_cover: true
        };
        request.post('/post_image/cover/')
            .set('X-CSRFToken', csrfToken)
            .type('form')
            .send(params)
            .accept('application/json')
            .end(cb);
    },

    deleteImage(id, cb) {
        var params = {
            id: id
        };
        request.post('/post_image/delete/')
            .set('X-CSRFToken', csrfToken)
            .type('form')
            .send(params)
            .accept('application/json')
            .end(cb);
        
    },

    createAlbum(params, cb) {
        request.post('/staff_api/v1/admin_albums/')
            .set('X-CSRFToken', csrfToken)
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    updateAlbum(id, params, cb) {
        request.put('/staff_api/v1/admin_albums/' + id + '/')
            .send(params)
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    deleteAlbum(id, cb) {
        request.del('/staff_api/v1/admin_albums/' + id + '/')
            .type('application/json')
            .accept('application/json')
            .end(cb);
    },

    createPhoto(album_uri, img, cb) {
        request.post('/staff_api/v1/admin_photos/')
            .attach('img', img, img.name)
            .field('album', album_uri)
            .accept('application/json')
            .end(cb)
    },

    updatePhoto(id, img, caption, album_uri, changed, cb) {
        if (changed)
            request.post('/staff_api/v1/admin_photos/')
                .attach('img', img, img.name)
                .field('id', id)
                .field('album', album_uri)
                .field('caption', caption)
                .accept('application/json')
                .end(cb);
        else {
            var params = {
                id: id,
                caption: caption,
            };
            request.post('/photo/edit/')
                .set('X-CSRFToken', csrfToken)
                .type('form')
                .send(params)
                .accept('application/json')
                .end(cb);
        }
    },

    deletePhoto(id, cb) {
        var params = {
            id: id
        };
        request.post('/photo/delete/')
            .set('X-CSRFToken', csrfToken)
            .type('form')
            .send(params)
            .accept('application/json')
            .end(cb);
        
    },
};