const express = require('express');
const router = express.Router();
const fs = require('fs');
const { addOne } = require('../model/api-key-model.js')

router
    .get('/', (req, res) => {
        const key = addOne();
        res.status(201).json({
            api_key: key
        });
    })

module.exports = router;
