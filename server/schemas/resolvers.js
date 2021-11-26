const { Book , User } = require('../models');
const { signToken } = require('../utils/auth.js');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({})
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user)
      return {token, user};
    },
    login: async (parent,  { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  },
};

module.exports = resolvers