const dateRange = (startDate, endDate) => {
    let dates = [];
    let start = new Date(startDate);
    let end = new Date(endDate)
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };



module.exports = {dateRange}