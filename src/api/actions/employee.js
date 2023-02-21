const clientApi = require("../client");
const {response} = require("express");
const {getEmployeeData} = require("../../helpers/employee");

const route = '/employee';

const getEmployee = async (req) => {
    try {
        const {userId} = req?.params;
        const output = await getEmployeeData(userId);
        return {status: 200, message: final}

    } catch (error) {
        console.log(error);
        let message = "An error occurred";
        if (error.response.status === 401) {
            message = "Provided AlexisHR token is incorrect.";
        }
        return {status: 500, message: message}
    }
};

module.exports = getEmployee;