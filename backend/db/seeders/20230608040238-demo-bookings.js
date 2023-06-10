'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '10/21/2023',
        endDate: '10/23/2023',     
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '11/21/2023',
        endDate: '11/23/2023',     
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '12/21/2023',
        endDate: '12/23/2023',     
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
