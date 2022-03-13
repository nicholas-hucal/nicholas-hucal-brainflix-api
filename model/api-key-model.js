const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
    return JSON.parse(fs.readFileSync('./data/api_keys.json'));
}

const getOne = (apiKey) => {
    return getAll().find(existing => String(existing) === String(apiKey)) ? true : false;
}

const createOne = () => {
    return uuidv4();
}

const addOne = () => {
    const existing = getAll();
    const apiKey = createOne();
    existing.push(apiKey);
    fs.writeFileSync('./data/api_keys.json', JSON.stringify(existing));
    return apiKey;
}

exports.getAll = getAll;
exports.getOne = getOne;
exports.createOne = createOne;
exports.addOne = addOne;