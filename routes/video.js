const express = require('express');
const router = express.Router();
const { success, created, notAuthorized, notFound, forbidden} = require('../responses/responses.js');
const fs = require('fs');
const { getVideo, getVideoList, addComment, deleteComment } = require('../model/videos-model.js')

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
        .post((req, res) => {
            success(res, {message: 'post a video'})
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
