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
        startDate: '2023-10-23',
        endDate: '2023-10-25',     
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-11-23',
        endDate: '2023-11-25',     
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-10-23',
        endDate: '2023-10-25',     
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-11-23',
        endDate: '2023-11-25',       
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-10-23',
        endDate: '2023-10-25',   
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-11-23',
        endDate: '2023-11-25',       
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-10-23',
        endDate: '2023-10-25',       
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2023-11-23',
        endDate: '2023-11-25',     
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
