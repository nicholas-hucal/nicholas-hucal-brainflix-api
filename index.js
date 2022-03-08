const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

const checkApiKey = (key, res) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/api_keys.json', (_err, data) => {
            const existing = JSON.parse(data)
            const found = existing.find(ex => String(ex) === String(key))
            if (!found) {                
                reject(res.status(401).send({
                    message: "Not Authorized"
                }));
            }
            resolve(found);
        })
    })
}

app.route('/videos')
    .get((req, res) => {
        console.log(`GET: on /videos`);
        checkApiKey(req.query.api_key, res)
            .then((response) => {
                fs.readFile('./data/videos.json', (_err, data) => {
                    let videos = JSON.parse(data);
                    if (videos.length < 1) {
                        res.status(404).json({
                            message: 'No videos found'
                        });
                    }
                    let response = videos.map(video => {
                        return {
                            id: video.id,
                            title: video.title,
                            image: video.image,
                            channel: video.channel
                        }
                    })
                    res.status(200).send(response);
                })
            })
            .catch(err => {
                console.log(err.statusMessage)
            })
    })
    .post((req, res) => {
        console.log(`POST: on /videos`);
        checkApiKey(req.query.api_key, res)
            .then(response => {
                res.status(200).json('post a video')
            })
            .catch(err => {
                console.log(err.statusMessage)
            })
    })

app.route('/videos/:id')
    .get((req, res) => {
        console.log(`GET: on /videos/:id`);

        checkApiKey(req.query.api_key, res)
            .then(response => {
                fs.readFile('./data/videos.json', (_err, data) => {
                    const videos = JSON.parse(data);
                    const video = videos.find(video => video.id === req.params.id);
                    if (!video) {
                        res.status(404).json({
                            message: 'video not found'
                        })
                    }
                    res.status(200).json(video);
                })
            })
            .catch(err => {
                console.log(err.statusMessage)
            }) 
    })

app.route('/register')
    .get((req, res) => {
        const api_key = uuidv4();
        fs.readFile('./data/api_keys.json', (_err, data) => {
            const existing = JSON.parse(data)
            existing.push(api_key)
            fs.writeFile('./data/api_keys.json', JSON.stringify(existing), () => {
                res.status(200).json({
                    api_key: api_key
                });
            })
        })
    })

app.listen(8080, () => {
    console.log('BrainFlix Server Running');
})