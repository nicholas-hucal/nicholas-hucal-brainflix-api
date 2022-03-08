const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router
    .get('/', (req, res) => {
        const api_key = uuidv4();
        fs.readFile('./data/api_keys.json', (_err, data) => {
            const existing = JSON.parse(data)
            existing.push(api_key)
            fs.writeFile('./data/api_keys.json', JSON.stringify(existing), () => {
                res.status(201).json({
                    api_key: api_key
                });
            })
        })
    })

module.exports = router;
