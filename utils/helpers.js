const { format } = require('date-fns');

module.exports = {
  formatDate: (date, formatStr) => {
    return format(new Date(date), formatStr);
  }
};
