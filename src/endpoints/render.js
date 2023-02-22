const bodyParser = require("body-parser");
const getAvatarItem = require("../lottie/items/avatar");
const fs = require('fs');
const path = require('path');
const svgson = require('svgson');
const addTextToSVG = require("../builder/atoms/text");
const mockedEmployee = require("../mock/employee.json");
const {response} = require("express");
const { parseDate, isCurrentDateBetween } = require('../helpers/dateHelper');

const registerRender = (app) => {
    const jsonParser = bodyParser.json();


    app.post('/render', jsonParser, async (req, res) => {
        const response = mockedEmployee.message;


        response.forEach(employee => {
            console.log(employee);
            const userUUID = employee.id;

            const path = `public/generated/${userUUID}`
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
            // const avatarAnimation = getAvatarItem(userUUID, employee?.avatarUrl);
            const startDate = parseDate(employee?.break?.startDate)
            const endDate = parseDate(employee?.break?.endDate)

            const isCurrentDateBetweenVariable = isCurrentDateBetween(employee?.break?.startDate, employee?.break?.endDate);
            const workingDate = isCurrentDateBetweenVariable ? endDate : startDate;
            let imagePath = `assets/builder/status/${isCurrentDateBetweenVariable ? 'timesheet.svg' : 'upcoming.svg'}`

            addTextToSVG(
                imagePath,
                {
                    id: userUUID,
                    firstName: employee?.firstName,
                    month: workingDate.month,
                    day: workingDate.day,
                    year: workingDate.year
                })
                .then((modifiedSVG) => {
                    console.log(modifiedSVG);
                })
                .catch((error) => {
                    console.error(error);
                });

            avatarAnimation.then(buffer => null)
                .catch(err => null)

        })


    })
}

module.exports = registerRender;