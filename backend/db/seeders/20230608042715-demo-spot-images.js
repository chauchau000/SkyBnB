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
        url: 'https://media.cntraveler.com/photos/614e3cf6d4cb4c568961dee5/16:9/w_5472,h_3078,c_limit/Disneyland_DXDDD2.jpg',
        preview: true
      },      {
        spotId: 1, 
        url: 'https://ca-times.brightspotcdn.com/dims4/default/2761ee6/2147483647/strip/true/crop/1731x1154+0+0/resize/1200x800!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff4%2F83%2Fafb70e7c42a49d0b1a330a939dee%2F012423ct2mb-0252.jpg',
        preview: false
      },
      {
        spotId: 2, 
        url: 'https://www.spaceneedle.com/imager/assets/36174/20190301RM__SN_AERIALS_736_26b7f4ee31988a68e5c956d5f4279f2c_26b7f4ee31988a68e5c956d5f4279f2c.jpeg',
        preview: true
      },
      {
        spotId: 3, 
        url: 'https://ca-times.brightspotcdn.com/dims4/default/038ae20/2147483647/strip/true/crop/5000x3235+0+0/resize/1200x776!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F22%2F62%2F34e27c684d2186409282d399be23%2Fsfmm-wonder-woman-flight-of-courage-01.jpg',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/2f/90/c6/aria.jpg?w=700&h=-1&s=1',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/pleasant-holidays/image/upload/v1665778401/prod/ari_main.jpg',
        preview: false
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3,4,5,6]}
    }, {});
  }
};
