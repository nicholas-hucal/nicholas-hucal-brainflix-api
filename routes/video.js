const express = require('express');
const router = express.Router();
const fs = require('fs');

const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.json');
    return JSON.parse(videos)
}

router
    .route('/')
        .get((req, res) => {
            console.log(`GET: on /videos`);
            let response = getVideos().map(video => {
                return {
                    id: video.id,
                    title: video.title,
                    image: video.image,
                    channel: video.channel
                }
            })
            if (!response) {
                res.status(404).json({
                    message: 'videos not found'
                })
            }
            res.status(200).send(response);
        })
        .post((req, res) => {
            console.log(`POST: on /videos`);
            res.status(200).json('post a video')
        })

router
    .route('/:id')
        .get((req, res) => {
            console.log(`GET: on /videos/:id`);
            const video = getVideos().find(video => video.id === req.params.id);
            if (!video) {
                res.status(404).json({
                    message: 'video not found'
                })
            }
            res.status(200).json(video);
        })

module.exports = router;
