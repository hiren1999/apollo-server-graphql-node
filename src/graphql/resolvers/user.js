import { compare, hash } from 'bcryptjs';
import { issueToken, serializeUser } from '../../functions';

export default {
	Query: {
		authenticateUser: async (_, { userName, password }, { User }) => {
			try {
				// Find user by username
				let user = await User.findOne({ userName });
				if (!user) {
					throw new Error('User not found');
				}
				// Check for the password
				let isMatch = await compare(password, user.password);
				if (!isMatch) {
					throw new Error('Invalid Credentials');
				}
				// Serialize user
				user = user.toObject();
				user.id = user._id;
				user = serializeUser(user);
				// Issue auth token
				let token = await issueToken(user);
				return { token, user };
			} catch (error) {
				throw new ApolloError(error.message, 401);
			}
		},
	},
	Mutation: {
		registerUser: async (_, { newUser }, { User }) => {
			try {
				const { userName, email } = newUser;
				let user;
				// Check if userName exists
				user = await User.findOne({ userName });
				if (user) {
					throw new Error('Username is already taken');
				}
				// Check if email exists
				user = await User.findOne({ email });
				if (user) {
					throw new Error('Email is already registered');
				}
				// Create new user Instance
				user = new User(newUser);
				// Hash password
				user.password = await hash(newUser.password, 10);
				// Save user
				let result = await user.save();
				result = result.toObject();
				result.id = result._id;
				result = serializeUser(result);
				// auth token
				let token = await issueToken(result);
				return {
					token,
					user: result,
				};
			} catch (err) {
				throw new ApolloError(err.message, 400);
			}
		},
	},
};
