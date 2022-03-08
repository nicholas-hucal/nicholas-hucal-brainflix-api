const express = require('express');
const app = express();

app.route('/')
    .get((req, res) => {
        console.log(`GET: on /`);
        res.status(200).json('get on route /');
    })
    .post((req, res) => {
        console.log(`POST: ${res}`);
        res.status(200).json('post on route /');
    })
    .delete((req, res) => {
        console.log(`DELETE: ${res}`);
        res.status(200).json('delete on route /');
    })

app.listen(8080, () => {
    console.log('BrainFlix Server Running');
})