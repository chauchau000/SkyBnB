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
        url: "https://www.architectureartdesigns.com/wp-content/uploads/2017/07/15-Compelling-Contemporary-Exterior-Designs-Of-Luxury-Homes-Youll-Love-1-630x420.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: 'https://st.hzcdn.com/simgs/pictures/bedrooms/miami-beach-modern-condo-kay-story-interiors-img~dcc15d8c0ab11ed0_14-0391-1-e35efec.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.mos.cms.futurecdn.net/5pEUqyd3SusoNdfesCqRdm.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.pellabranch.com/windows-doors/inspiration/favorite-backyard-ideas/',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://pellabranch-prod.gumlet.io/webres/Image/favorite-backyard-hingeddoor.jpg?w=800&dpr=1.0',
        preview: false
      },
      //Spot 2
      {
        spotId: 2,
        url: 'https://www.architectureartdesigns.com/wp-content/uploads/2017/07/15-Compelling-Contemporary-Exterior-Designs-Of-Luxury-Homes-Youll-Love-2-630x832.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.trendir.com/wp-content/uploads/old/interiors/2016/01/26/contemporary-bedroom-with-a-view-presotto-aqua.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tmhmedia.themodernhouse.com/uploads/2019/09/Sustainable-Kitchens_The-Modern-House-Directory-5-1200x800.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.home-designing.com/wp-content/uploads/2019/01/modern-bathroom-tile.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.homedit.com/wp-content/uploads/2019/10/Backyard-firepit-and-corten-steel.jpg',
        preview: false
      },
      //spot 3
      {
        spotId: 3,
        url: 'https://www.architectureartdesigns.com/wp-content/uploads/2017/07/15-Compelling-Contemporary-Exterior-Designs-Of-Luxury-Homes-Youll-Love-3-630x420.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.home-designing.com/wp-content/uploads/2014/05/1-White-bedroom-design.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/fd/4f/60/fd4f60818dbf975c44b90e8392a663df.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://st.hzcdn.com/simgs/pictures/bathrooms/amagansett-modern-beach-house-kevin-o-sullivan-associates-img~f96188bb0b71afd1_4-3902-1-a39335b.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.homedit.com/wp-content/uploads/2019/10/Lush-vegetation-backyard-Wittman-Estes-ArchitectureLandscape.jpg',
        preview: false
      },
      //Spot 4
      {
        spotId: 4,
        url: 'https://www.architectureartdesigns.com/wp-content/uploads/2017/07/15-Compelling-Contemporary-Exterior-Designs-Of-Luxury-Homes-Youll-Love-5-630x467.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.architectureartdesigns.com/wp-content/uploads/2017/07/15-Compelling-Contemporary-Exterior-Designs-Of-Luxury-Homes-Youll-Love-5-630x467.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cmsmedia.remodelista.com/wp-content/uploads/2022/04/daniel-sanderson-evering-road-kitchen-modern-house.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/736x/7a/df/51/7adf51422e10f67a99f5e8304c002e69.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.homedit.com/wp-content/uploads/2019/10/Landscape-backyard-idea-cheese-board-on-grass.jpg',
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
