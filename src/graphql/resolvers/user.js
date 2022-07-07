import { hash } from 'bcryptjs';
import { issueToken } from '../../functions';

export default {
	Query: {
		infoUserResolvers: () => 'This is the infoUserResolvers',
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
