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
        url: 'https://pixabay.com/get/g2f55369f98097ebd20b5b62354045cf19caea4ec74d0d4998be3bcad38d49821c027fb12d5df8beaac7f6293bad8c007d910b8d3ba035cf08d15374ef92fe1d3_1280.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: "https://pixabay.com/get/g880356e24f8c95b35721e73a1c88f56fe0734ad570f5544a5f7e2f0fb1ecbb5c912ad04dbb122fed840410170a467386_1280.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: 'https://pixabay.com/get/g446d071a20529ace79f5b1cf77f756a5500844b9af46af646a19d52389e81d18651990909f8d8187a482706ce1bb546050208cbd50385d6ff8e38ccdeafef9fe_1280.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://pixabay.com/get/g6e735fe5f8a582b07e9f500e3667707eb202522425c3a297622b7c75d7692081e0734d2c33235779ca22da2e9c370eb14d4259c3a576b1f647f9dd1802aae010_1280.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://pixabay.com/get/g23a50764ae7039e17c8fb73dc9f24ef051f29d2c6f398bc69c9af0cc73aa36766a4d6c48eafe97341f83ea9bf9a9e8c8beb2855cd9750804dc4277506579b847_1280.jpg',
        preview: false
      },
      //Spot 2
      {
        spotId: 2,
        url: 'https://pixabay.com/get/g3424682269c59efafd05894cb9378c7b9f1dfeef5aa42bb3529e6643b0cb02861e38815d1e51e4aa59ce927d8d6f836a31b6d913d6d1869fc3cd073a99b7b3c9_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://pixabay.com/get/g090c19359273fbadb556d44a3daa84bc8b7b08525a6324bc4794e2900e29d6546519faad3f9dda1cb95cebb2ac966f63_1280.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://pixabay.com/get/g72d490c017b261d792aac0186e21a471f8f8890f224cd81f4a55ce5dc081ed2f9e8ac95f7721ca6fa71006b4fe040feb26915892432788a691792b0811d03e40_1280.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://pixabay.com/get/gf107e27804ef2bea517100df59d73a17064bbae4585dc718d45eece783f1d0767b6c6363958836c16daa0b2ccaa90376_1280.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://pixabay.com/get/g44cda5c289cb0622397106b5ae1e004a1840bcd49f40edee0355ed53ad00591ee4df9af320a797a1fc8c5807e30453e14234cfdd1c8f06df659b6663e61b120d_1280.jpg',
        preview: true
      },
      //spot 3
      {
        spotId: 3,
        url: 'https://pixabay.com/get/g7ba85da20d735e89b3422f0df9e3c1efd6026ef920044d3f7bd9853129b1c2df763806d70acbaae44d11e402f2675d2d1d4038bcbe05799dd3efe8abdcfb2341_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://pixabay.com/get/gbc901372bb60e2d5d747b9ceeae811fc605557ec6e6a2ef961c27063f35bec218db7bc6270cdbf86b4bb6b131dd07f7a8909c969fb843a7c8577d41a37d0b32a_1280.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://pixabay.com/get/g191bfdbd29b63d835c30ccf403634ccec959701b86baf6e133c99783e7097fdb514128e611771e93671166538a3131ce_1280.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://pixabay.com/get/g3052f9781064c0b555514e3645ccc35dd6f2ffe953e025c6d0b801a0c175c1caf2b9baeb08414cb6d8237d3459e6044367dde8ed1ec9d7fd123bff68aac468cd_1280.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://pixabay.com/get/g06bd9fddefb33ea03d62abff8903338368725674e90a3840bf52bb23e8cd55ce1ed83cbc2e299ff6499c641c1923bc75ec4fa6f4f0bc5c3a76b1744309d9b3fd_1280.jpg',
        preview: false
      },
      //Spot 4
      {
        spotId: 4,
        url: 'https://pixabay.com/get/gc0e2bbcb598621f66baa81bdc88137258c3eb983ad2d50f651f87dbd6ea8be543229fc87c1aec4b506c84de24179c83af91c109d4c61cda56ff3d37932c564f3_1280.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://pixabay.com/get/g82e37cfe80a11cd6e0d2b7fbd6d1eee0d4066698a12638c81697097908afe3cacc3f518d2a4d5c19546a7e447489fa01bcf8a924f896e168fdd040d54f141585_1280.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://pixabay.com/get/gd92e8894c55eba2b976f597d57995cee1509c1001e7591d67f6b0f5c52b5dea4509ffe21fa24389e78e78ee33ca35cb30b1e84c825cd430b181c003e6851282b_1280.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://pixabay.com/get/g1717a65c25ffd90e44686cd672c6d04dd4a63ebecb2d88bd9e9906e0b8310df4b85d83d65c1122c9ca7e3e7429adaee2d2e008e678b5e41f10d2af5aaf24ba7a_1280.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://pixabay.com/get/g47a1b47f7cd907592391493d9cfc0ff587cf8e2466b1c81835ce284c45a00266bf720699773f0d5ea77c15cbdbcb5f954b9176375563ccdf735dbe2ed8546485_1280.jpg',
        preview: false
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
