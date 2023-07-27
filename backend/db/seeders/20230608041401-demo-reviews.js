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
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 3
      }, 
      {
        spotId: 1,
        userId: 3, 
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 4
      }, 
      {
        spotId: 2,
        userId: 1, 
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3, 
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1, 
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
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
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3, 
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet consectetur adipiscing elit pellentesque. Odio facilisis mauris sit amet. Tellus in metus vulputate eu. Quisque sagittis purus sit amet volutpat consequat mauris. Gravida neque convallis a cras semper. Nec ullamcorper sit amet risus nullam eget felis. Id diam vel quam elementum pulvinar etiam non quam. Dolor sed viverra ipsum nunc. \n Eget nunc lobortis mattis aliquam faucibus purus in massa. Dolor sit amet consectetur adipiscing elit. Leo integer malesuada nunc vel risus. Id volutpat lacus laoreet non curabitur. Dui accumsan sit amet nulla facilisi morbi. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Id neque aliquam vestibulum morbi blandit cursus risus at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Enim facilisis gravida neque convallis a cras semper auctor neque. Nullam ac tortor vitae purus faucibus ornare suspendisse. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Justo donec enim diam vulputate ut pharetra sit. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ut tortor pretium viverra suspendisse potenti nullam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ut sem viverra aliquet eget sit amet tellus. Elementum tempus egestas sed sed. Pulvinar elementum integer enim neque.",
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
