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
        userId: 1,
        address: '1 Disney Way',
        city: 'Anaheim',
        state: 'California',
        country: 'USA',
        lat: 33.8121,
        lng: -117.9190,
        name: 'Disneyland',
        description: 'The Happiest Place on Earth',
        price: 100,
        avgRating: 5.0
      },
      {
        userId: 2,
        address: '400 Broad St',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 54.545,
        lng: -164.190,
        name: 'Space Needle',
        description: 'The Space Needle is an observation tower in Seattle, Washington, United States. Considered to be an icon of the city, it has been designated a Seattle landmark.',
        price: 50,
        avgRating: 3.5
      },
      {
        userId: 3,
        address: '26101 Magic Mountain Pkwy',
        city: 'Valencia',
        state: 'California',
        country: 'USA',
        lat: 38.8121,
        lng: -137.9190,
        name: 'Six Flags Magic Mountain',
        description: 'Six Flags Magic Mountain, formerly known and colloquially referred to as simply Magic Mountain, is a 209-acre amusement park located in Valencia, California, ',
        price: 165,
        avgRating: 4.2
      },
      {
        userId: 1,
        address: '3730 S Las Vegas Blvd',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'USA',
        lat: 15.8121,
        lng: -65.5590,
        name: 'Aria Casino',
        description: 'Aria Resort and Casino is a luxury resort and casino, and the primary property at the CityCenter complex, located on the Las Vegas Strip in Paradise, Nevada.',
        price: 255,
        avgRating: 4.8
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Disneyland', 'Space Needle', 'Six Flags Magic Mountain', 'Aria Casino'] }
    }, {});
  }
};
