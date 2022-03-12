const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.json');
    return JSON.parse(videos)
}

const getVideo = (id) => {
    return getVideos().find(video => video.id === id);
}

const getVideoList = () => {
    return getVideos().map(video => {
        return {
            id: video.id,
            title: video.title,
            image: video.image,
            channel: video.channel
        }
    })
}

const addComment = (comment, videoId) => {
    const toSend = {
        "id": uuidv4(),
        "name": comment.name,
        "comment": comment.comment,
        "likes": 0,
        "timestamp": Date.now(),
        "avatar": "http://localhost:8080/avatars/Mohan-muruge.jpg"
    }
    const existing = getVideos();
    const foundIndex = existing.findIndex(ex => ex.id === videoId);
    existing[foundIndex].comments.push(toSend);
    fs.writeFileSync('./data/videos.json', JSON.stringify(existing));
}

const deleteComment = (commentId, videoId) => {
    const existing = getVideos();
    const modified = existing.map(ex => {
        if (ex.id === videoId) {
            ex.comments = ex.comments.filter(comment => comment.id !== commentId);
        }
        return ex;
    })
    fs.writeFileSync('./data/videos.json', JSON.stringify(modified));
}

const addCommentIds = () => {
    const videos = getVideos()
    const withIds = videos.map(video => {
        video.comments = video.comments.map(comment => {
            comment.id = uuidv4();
            return comment;
        })
        return video;
    })
    fs.writeFileSync('./data/videos.json', JSON.stringify(withIds));
}

exports.getVideos = getVideos;
exports.addCommentIds = addCommentIds;
exports.getVideoList = getVideoList;
exports.getVideo = getVideo;
exports.addComment = addComment;
exports.deleteComment = deleteComment;