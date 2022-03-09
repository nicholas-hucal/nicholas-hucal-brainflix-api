require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const authenticate = (apiKey, res, next) => {
    if (!apiKey) {
        return res.status(401).send({
            message: "Not Authorized"
        })
    } 
    fs.readFile('./data/api_keys.json', (_err, data) => {
        const existing = JSON.parse(data)
        const found = existing.find(ex => String(ex) === String(apiKey))
        if (!found) {    
            return res.status(401).send({
                message: "Not Authorized"
            })
        } 
        next()
    })
}

//MIDDLEWARE
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
app.use((req, res, next) => {
    // get headers api key like below
    //console.log(req.get('x-api-key'));
    if (req.url !== '/register') {
        authenticate(req.query.api_key, res, next)
    } else {
        next()
    }
})

// ROUTES
const videoRoute = require('./routes/video');
app.use('/videos', videoRoute);

const registerRoute = require('./routes/register');
app.use('/register', registerRoute);

// LISTEN
app.listen(process.env.PORT, () => {
    console.log('BrainFlix Server Running');
})