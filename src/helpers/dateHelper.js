function parseDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'}).toUpperCase();
    const year = date.getFullYear();
    return {day, month, year}
}

function isCurrentDateBetween(startDate, endDate) {
    const currentDate = new Date();
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (currentDate >= parsedStartDate && currentDate <= parsedEndDate) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = { parseDate, isCurrentDateBetween };