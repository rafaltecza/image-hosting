const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const requestProgress = require('request-progress');
const Jimp = require('jimp');
const async = require('async');
const cron = require('node-cron');
const dotenv = require('dotenv');
const api = require('./api');
dotenv.config();

const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

app.get('/logo', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'logo.png'));
});

app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});

/**
 * Cron job
 * Runs every 15 minutes
 **/
cron.schedule('*/15 * * * *', () => {
    getUsersList((err, users) => {
        if (err) {
            console.error(err);
        } else {
            users.forEach(user => {
                getUserDetails(user.id, (err, userDetails) => {
                    if (err) {
                        console.error(err);
                    } else {
                        generateImage(userDetails)
                            .then(message => console.log(message))
                            .catch(err => console.error(err));
                    }
                });
            });
        }
    });
});

const authToken = "Bearer " + process.env.AUTH_TOKEN;
const alexisHRBaseUrl = api.alexisHRBaseUrl;

/**
 * Get list of users
 * @param callback
 */
function getUsersList(callback) {
    const options = {
        url: alexisHRBaseUrl + "users",
        headers: {
            "Authorization": authToken
        }
    };

    requestProgress(request(options, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        const users = JSON.parse(body).users;
        console.log(`Received list of ${users.length} users.`);
        callback(null, users);
    }), {
        throttle: 1000,
        delay: 1000
    })
        .on('progress', state => {
            console.log(`Retrieving user list progress: ${(state.percent * 100).toFixed(2)}%`);
        });
}

/**
 * Get user details
 * @param userId
 * @param callback
 */
function getUserDetails(userId, callback) {
    const options = {
        url: alexisHRBaseUrl + `users/${userId}`,
        headers: {
            "Authorization": authToken
        }
    };

    requestProgress(request(options, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        const userDetails = JSON.parse(body);
        console.log(`Received details for user ${userId}.`);
        callback(null, userDetails);
    }), {
        throttle: 1000,
        delay: 1000
    })
        .on('progress', state => {
            console.log(`Retrieving user details for user ${userId} progress: ${(state.percent * 100).toFixed(2)}%`);
        });
}

/**
 * Generate image
 * @param userDetails
 * @returns {Promise<unknown>}
 */
function generateImage(userDetails) {
    return new Promise((resolve, reject) => {
        Jimp.read(userDetails.avatar)
            .then(image => {
                const text = new Jimp(image.bitmap.width, Jimp.AUTO, 0xFFFFFFFF);
                text.print(Jimp.fonts.verdana10, 0, 0, {
                    text: `Name: ${userDetails.first_name} ${userDetails.last_name}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                }, image.bitmap.width);
                text.print(Jimp.fonts.verdana10, 0, 15, {
                    text: `Email: ${userDetails.email}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                }, image.bitmap.width);
                text.print(Jimp.fonts.verdana10, 0, 30, {
                    text: `Title: ${userDetails.title}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                }, image.bitmap.width);
                image.composite(text, 0, image.bitmap.height);
                return image
                    .quality(100)
                    .write(path.join(__dirname, `../public/generated/${userDetails.id}.png`), () => {
                        resolve(`Image generated and saved to /public/generated/${userDetails.id}.png`);
                    });
            })
            .catch(err => reject(err));
    });
}