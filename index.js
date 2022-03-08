const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

//MIDDLEWARE
const checkApiKey = (req, res, next) => {
    fs.readFile('./data/api_keys.json', (_err, data) => {
        const existing = JSON.parse(data)
        const found = existing.find(ex => String(ex) === String(req.query.api_key))
        if (!found) {                
            res.status(401).send({
                message: "Not Authorized"
            })
        }
        next();
    })
}
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

// ROUTES
const videoRoute = require('./routes/video');
app.use('/videos', checkApiKey, videoRoute);

const registerRoute = require('./routes/register');
app.use('/register', registerRoute);

// LISTEN
app.listen(8080, () => {
    console.log('BrainFlix Server Running');
})