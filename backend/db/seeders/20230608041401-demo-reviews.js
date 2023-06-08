'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2, 
        spotId: 1,
        review: 'This is truly the happeist place on earth',
        stars: 5
      }, 
      {
        userId: 3, 
        spotId: 2,
        review: 'Loved it - the observation deck was everything', 
        stars: 4
      }, 
      {
        userId: 1, 
        spotId: 2,
        review: 'Not sure it was worth it for the price, but the view was amazing.',
        stars: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
