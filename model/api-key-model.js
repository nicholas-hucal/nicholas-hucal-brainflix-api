const fs = require('fs');
const responses = require('../responses/responses.js');

const getAll = () => {
    return JSON.parse(fs.readFileSync('./data/api_keys.json'));
}

const getOne = (apiKey) => {
    return getAll().find(existing => String(existing) === String(apiKey)) ? true : false;
}

exports.getAll = getAll;
exports.getOne = getOne;