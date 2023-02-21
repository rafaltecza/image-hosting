const axios = require('axios');
require('dotenv').config();

const clientApi = axios.create({
    baseURL: process.env.API_DAFTCODE_PROXY,
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = clientApi;