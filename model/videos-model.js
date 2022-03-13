require('dotenv').config();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.json');
    return JSON.parse(videos)
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

const randomVideoList = () => {
    return [
        `http://localhost:${process.env.PORT}/videos/coding`,
        `http://localhost:${process.env.PORT}/videos/hike`,
        `http://localhost:${process.env.PORT}/videos/painting`,
        `http://localhost:${process.env.PORT}/videos/roadtrip`,
        `http://localhost:${process.env.PORT}/videos/travel`,
    ]
}

const getRandomVideoLink = () => {
    const videos = randomVideoList();
    return videos[Math.floor(Math.random()*videos.length)]
}

const getVideo = (id) => {
    return getVideos().find(video => video.id === id);
}

const addVideo = (video, file) => {
    const newVideo = {
        "title": video.title,
        "channel": "MohanMuruge",
        "image": `http://localhost:${process.env.PORT}/images/` + file.filename,
        "description" : video.description,
        "views": "0",
        "likes": "0",
        "duration": "2:43",
        "video": getRandomVideoLink(),
        "timestamp": Date.now(),
        "comments": [],
        "id": uuidv4()
    }
    const existing = getVideos();
    existing.unshift(newVideo);
    fs.writeFileSync('./data/videos.json', JSON.stringify(existing));
}

const updateViews = (videoId) => {
    const existing = getVideos();
    const foundIndex = existing.findIndex(ex => ex.id === videoId);
    existing[foundIndex].views = numberWithCommas(stripCommas(existing[foundIndex].views) + 1);
    fs.writeFileSync('./data/videos.json', JSON.stringify(existing));
    return existing[foundIndex];
}

const updateLikes = (videoId) => {
    const existing = getVideos();
    const foundIndex = existing.findIndex(ex => ex.id === videoId);
    existing[foundIndex].likes = numberWithCommas(stripCommas(existing[foundIndex].likes) + 1);
    fs.writeFileSync('./data/videos.json', JSON.stringify(existing));
    return existing[foundIndex];
}

const addComment = (comment, videoId) => {
    const toSend = {
        "id": uuidv4(),
        "name": comment.name,
        "comment": comment.comment,
        "likes": 0,
        "timestamp": Date.now(),
        "avatar": `http://localhost:${process.env.PORT}/avatars/Mohan-muruge.jpg`
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

const doSearch = (search) => {
    const all = getVideos();
    const result = all.filter(video => {
        const title = video.title.toLowerCase().includes(search.search.toLowerCase());
        const channel = video.channel.toLowerCase().includes(search.search.toLowerCase());
        const desc = video.description.toLowerCase().includes(search.search.toLowerCase());
        if (title || channel || desc) {
            return video;
        }
    })
    return result;
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const stripCommas = (x) => {
    return Number(x.replace(/\D/g,''));
}

exports.getVideos = getVideos;
exports.addVideo = addVideo;
exports.addCommentIds = addCommentIds;
exports.getVideoList = getVideoList;
exports.getVideo = getVideo;
exports.addComment = addComment;
exports.deleteComment = deleteComment;
exports.updateViews = updateViews;
exports.updateLikes = updateLikes;
exports.doSearch = doSearch;