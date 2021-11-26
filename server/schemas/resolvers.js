const User = require("../models/User.js");



const resolvers = {
  Query: {
    users: async () => {
      return User.find({})
    },
  }
};

module.export = resolvers