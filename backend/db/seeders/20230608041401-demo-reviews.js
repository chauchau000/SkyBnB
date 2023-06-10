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
        spotId: 1,
        userId: 2, 
        review: "review1",
        stars: 3
      }, 
      {
        spotId: 1,
        userId: 3, 
        review: "review2", 
        stars: 4
      }, 
      {
        spotId: 2,
        userId: 1, 
        review: "review3",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3, 
        review: "review4",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1, 
        review: "review5",
        stars: 5
      },
      {
        spotId: 3,
        userId: 2, 
        review: "review6",
        stars: 5
      },
      {
        spotId: 4,
        userId: 2, 
        review: "review7",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3, 
        review: "review8",
        stars: 2
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
