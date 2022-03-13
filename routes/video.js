const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const { success, created, notAuthorized, notFound, forbidden } = require('../responses/responses.js');
const { getVideo, getVideoList, addVideo, addComment, deleteComment, updateViews, updateLikes, doSearch } = require('../model/videos-model.js')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        cb(null, fileName)
    }
})
const upload = multer({storage: storage})

router
    .route('/')
    .get((_req, res) => {
        let response = getVideoList()
        if (!response) {
            notFound(res);
        } else {
            success(res, response);
        }
    })
    .post(upload.single('image'), (req, res) => {
        const video = req.body;
        const file = req.file;
        if (video) {
            addVideo(video, file);
            created(res, {message: 'created new video'});
        } else {
            notFound(res);
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const video = getVideo(req.params.id);
        if (!video) {
            notFound(res);
        } else {
            success(res, video);
        }
    })

router
    .route('/:id/comments')
    .post((req, res) => {
        const videoId = req.params.id;
        const comment = req.body;
        if (comment && videoId) {
            addComment(comment, videoId)
            created(res, {
                'message': 'comment created'
            });
        } else {
            notFound(res);
        }
    })

router
    .route('/:id/views')
    .put((req, res) => {
        const videoId = req.params.id;
        if (videoId) {
            const video = updateViews(videoId)
            created(res, video);
        } else {
            notFound(res);
        }
    })

router
    .route('/:id/likes')
    .put((req, res) => {
        const videoId = req.params.id;
        if (videoId) {
            const video = updateLikes(videoId)
            created(res, video);
        } else {
            notFound(res);
        }
    })

router
    .route('/:id/comments/:commentId')
    .delete((req, res) => {
        const { id, commentId } = req.params
        if (commentId && id) {
            deleteComment(commentId, id);
            success(res, {
                'message': 'comment deleted'
            });
        } else {
            notFound(res)
        }
    })

router
    .route('/search')
    .post((req, res) => {
        const search = req.body;
        if (search) {
            const result = doSearch(search);
            success(res, result);
        } else {
            notFound(res)
        }
    })

module.exports = router;
