const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const { success, created, notAuthorized, notFound, forbidden } = require('../responses/responses.js');
const { getVideo, getVideoList, addVideo, addComment, deleteComment } = require('../model/videos-model.js')
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

module.exports = router;
