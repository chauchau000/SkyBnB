'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Huckleberry Lane',
        city: 'Beverly Hills',
        state: 'California',
        country: 'USA',
        lat: 33.8121,
        lng: -117.9190,
        name: 'AirBnB Spot #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare suspendisse sed nisi lacus sed viverra. Amet facilisis magna etiam tempor orci. Aliquet eget sit amet tellus cras adipiscing enim eu. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Tristique sollicitudin nibh sit amet commodo. Interdum posuere lorem ipsum dolor. Sit amet mattis vulputate enim nulla aliquet porttitor. Blandit libero volutpat sed cras ornare.',
        price: 100,
      },
      {
        ownerId: 2,
        address: '456 Strawberry Park',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 54.545,
        lng: -164.190,
        name: 'AirBnB Spot #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare suspendisse sed nisi lacus sed viverra. Amet facilisis magna etiam tempor orci. Aliquet eget sit amet tellus cras adipiscing enim eu. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Tristique sollicitudin nibh sit amet commodo. Interdum posuere lorem ipsum dolor. Sit amet mattis vulputate enim nulla aliquet porttitor. Blandit libero volutpat sed cras ornare.',
        price: 50,
      },
      {
        ownerId: 3,
        address: '789 Watermelon Circle',
        city: 'Irvine',
        state: 'California',
        country: 'USA',
        lat: 38.8121,
        lng: -137.9190,
        name: 'AirBnB Spot #3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare suspendisse sed nisi lacus sed viverra. Amet facilisis magna etiam tempor orci. Aliquet eget sit amet tellus cras adipiscing enim eu. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Tristique sollicitudin nibh sit amet commodo. Interdum posuere lorem ipsum dolor. Sit amet mattis vulputate enim nulla aliquet porttitor. Blandit libero volutpat sed cras ornare.',        
        price: 165,
      },
      {
        ownerId: 1,
        address: '123 Fuji Apple Lane',
        city: 'Malibu',
        state: 'California',
        country: 'USA',
        lat: 15.8121,
        lng: -65.5590,
        name: 'AirBnB Spot #4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare suspendisse sed nisi lacus sed viverra. Amet facilisis magna etiam tempor orci. Aliquet eget sit amet tellus cras adipiscing enim eu. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Tristique sollicitudin nibh sit amet commodo. Interdum posuere lorem ipsum dolor. Sit amet mattis vulputate enim nulla aliquet porttitor. Blandit libero volutpat sed cras ornare.',        
        price: 255,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['AirBnB Spot #1', 'AirBnB Spot #2', 'AirBnB Spot #3', 'AirBnB Spot #4'] }
    }, {});
  }
};
