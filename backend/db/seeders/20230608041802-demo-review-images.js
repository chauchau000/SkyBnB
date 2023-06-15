'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "www.pictures1.com"
      },      
      {
        reviewId: 1,
        url: "www.pictures2.com"
      }
      ,
      {
        reviewId: 2,
        url: "www.pictures3.com"
      },
      {
        reviewId: 3,
        url: "www.pictures4.com"
      },
      {
        reviewId: 4,
        url: "www.pictures5.com"
      },
      {
        reviewId: 4,
        url: "www.pictures6.com"
      },
      {
        reviewId: 5,
        url: "www.pictures7.com"
      },
      {
        reviewId: 5,
        url: "www.pictures8.com"
      },      
      {
        reviewId: 6,
        url: "www.pictures9.com"
      },      
      {
        reviewId: 7,
        url: "www.pictures10.com"
      },      
      {
        reviewId: 8,
        url: "www.pictures11.com"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
    }, {});
  }
};
