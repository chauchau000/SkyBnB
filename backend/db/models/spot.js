'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany( models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
      Spot.hasMany( models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
      Spot.belongsTo( models.User, { foreignKey: 'ownerId', as: "Owner" });
      Spot.hasMany( models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true})
    }


  };
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      //include all
    },
    scopes: {
      basic: {
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        }
      }
    }
  });
  return Spot;
};