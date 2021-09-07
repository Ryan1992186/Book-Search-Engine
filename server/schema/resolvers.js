const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });
                return userData;
            }
        },

        users: async () => {
            return await User.find().select('-__v -password').populate('savedBooks');
        },

        user: async ({ username }) => {
            return await User.findOne({ username }).select('-__v -password').populate('savedBooks');
        }
    },

    Mutation: {
        login: async ({ email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Wrong Login Information');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong Login Information');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async ({ bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Request Error');
        },
        removeBook: async ({ bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to logged in to access that feature');
        }
    }
};

module.exports = resolvers;