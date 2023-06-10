'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1, 
        url: 'www.spot1picture1.com',
        preview: true
      },      {
        spotId: 1, 
        url: 'www.spot1picture2.com',
        preview: false
      },
      {
        spotId: 2, 
        url: 'www.spot2picture1.com',
        preview: true
      },
      {
        spotId: 3, 
        url: 'www.spot3picture1.com',
        preview: true
      },
      {
        spotId: 4, 
        url: 'www.spot4picture1.com',
        preview: true
      },
      {
        spotId: 4, 
        url: 'www.spot4picture2.com',
        preview: false
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3,4]}
    }, {});
  }
};
