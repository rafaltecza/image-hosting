const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const requestProgress = require('request-progress');
const Jimp = require('jimp');
const async = require('async');
const cron = require('node-cron');
const dotenv = require('dotenv');
const registerRender = require("./src/endpoints/render");
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

app.get('/gifo', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'gifo.gif'));
});

app.get('/test', (req, res) => {
    res.send('<img src="/assets/builder/footer/default_clean.svg" alt="" />');

});


app.get('/testing', (req, res) => {
    res.send('<img src="/assets/test.svg" alt="" />');
});


const initEndpoint = (app, routes) => {
    routes.forEach(route => {
        console.log(`Initializing endpoint:`, route.name);
        route(app)
    });
}

initEndpoint(app, [registerRender]);



app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});
//
// /**
//  * Cron job
//  * Runs every 15 minutes
//  **/
// getUsersList((err, users) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(users);
//     }
// });
//
//
// console.log(1);
// cron.schedule('*/15 * * * *', () => {
//     console.log(2);
//
//     getUsersList((err, users) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(3);
//
//             users.forEach(user => {
//                 getUserDetails(user.id, (err, userDetails) => {
//                     if (err) {
//                         console.error(err);
//                     } else {
//                         generateImage(userDetails)
//                             .then(message => console.log(message))
//                             .catch(err => console.error(err));
//                     }
//                 });
//             });
//         }
//     });
// });


/**
 * Get list of users
 * @param callback
 */
function getUsersList(callback) {

    const authToken = "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcHAuYWxleGlzaHIuY29tIl0sImNsaWVudElkIjoiNWFjYmQyMTIwMTUwYWYwMDFlNDIwYjg4Iiwic3ViIjoiNjMyOTY2ZDcyOGFhZjkwMDE5NWE2ZTY2OjYzMTVhNjBlM2ExYzEyMDAxOTQwYjg5NSIsImp0aSI6IjE2NzUzMjY2ODExNzMtZmNPd3RDVmZRQU5KWHNRQThuS1ZlbVdzIiwidWlkIjoiNjMyOTY2ZDcyOGFhZjkwMDE5NWE2ZTY2IiwiY29tcGFueUlkIjoiNjMxNWE2MGUzYTFjMTIwMDE5NDBiODk1IiwibWVtYmVyc2hpcHMiOlt7ImlkIjoiNjMyOTY2ZDgyOGFhZjkwMDE5NWE2ZTdmIiwiY29tcGFueUlkIjoiNjMxNWE2MGUzYTFjMTIwMDE5NDBiODk1IiwiZW1wbG95ZWVJZCI6IjYzMjk2NmQ4MjhhYWY5MDAxOTVhNmU4YyIsInJvbGUiOiJtZW1iZXIiLCJhY3RpdmUiOnRydWV9XSwic2NvcGUiOiJvcGVuaWQiLCJpYXQiOjE2NzUzMjY2ODEsImV4cCI6MTY3NTMyODQ4MSwiaXNzIjoiaHR0cHM6Ly9pZC5hbGV4aXNoci5jb20ifQ.EWlFrkr3mDBLpmxTtg-2osrYi1o0tvZ6bKw6LZviiMHZ1NAZGYHC1CfuHIlTnKTTROVDUbUIqeKB6z0zTNrPzz6Bo3ZEla7AWTGvRsXoeBlbYk3kxd1Altr8RRIzGUyIB_NR0zgDRGlzmzu_f8xkGYSwPAZDWVBI5aG9G05VinBFQ6ADubMI49uDX3-IlR-wqky_KQExk7n9r1cjgX5kklkf1yhqQpck4eMWK-eONUyVAQKb_XV8U0IPDxhacUFEwM7R0ZVWgzWV0xsexNfaDCubwVsIll2KpyQpOkCa-9j2nbatG-BY_6t5_qWcCHdBOCc0Xynkt3sAkYZZoXMk931x63nzXgOzMHDSbhQaytAsbBFcARo-aEz-jRYdfDBk0CWXlrIxwTrvsotakb3D14A_MZnER1RGaYJhDx0pNVaGHkNhSjA-AZV6oyIcNblMCsvF7_O15cnOBirSQzJa_NKHDn9zTmZ9dpTaGmEh-3qkhQHN9VWsg-qVNfsLtqGA3ricBKNUAbrWPgEpN1tNfZa60izWV4B7aS9gklrTc75SJCJtkmfd5aFaQTnvQmBgrkdruEWA03lWcY5_FaFy_nbo7nZJbHqmiv-PTwJYwYI8n3Gapt2b8yel6MaPSBCtWc9xLSkz0m-9WESZqDpNtRxcIOMiSWbSH16oSU4mUXc";
    const alexisHRBaseUrl = process.env.ALEXIS_HR_BASE_URL;

    const options = {
        url: "https://api.alexishr.com/v1/" + "employee",
        headers: {
            "Authorization": authToken
        }
    };

    requestProgress(request(options, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        const users = JSON.parse(body).users;
        console.log(JSON.parse(body));
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