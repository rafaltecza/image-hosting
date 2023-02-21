const clientApi = require("../api/client");

const route = "/employee";

const getEmployeeData = async (userId = null) => {
    const url = userId ? `${route}/${userId}` : route;
    const response = await clientApi.get(url);
    return response.data;
};

module.exports = {
    getEmployeeData,
};
