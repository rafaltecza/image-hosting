const cron = require("node-cron");

const registerCron = () => {
    cron.schedule('*/1 * * * *', () => {
        console.log("Wykonywane co 1 min");
    });
}

module.exports = registerCron;