import { UserInputError } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { issueToken, serializeUser } from "../../functions";
import { validateLoginInput, validateRegisterInput } from "../../validators";

export default {
	Query: {
		authenticateUser: async (_, { userName, password }, { User }) => {
			const { errors, isValid } = validateLoginInput({
				userName,
				password,
			});
			if (!isValid) {
				throw new UserInputError("Errors", { errors: errors });
			}
			try {
				// Find user by username
				let user = await User.findOne({ userName });
				if (!user) {
					throw new ApolloError("User not found", 422);
				}
				// Check for the password
				let isMatch = await compare(password, user.password);
				if (!isMatch) {
					throw new ApolloError("Invalid Credentials", 422);
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
			const { errors, isValid } = validateRegisterInput(newUser);

			if (!isValid) {
				throw new UserInputError("Errors", { errors: errors });
			}
			try {
				const { userName, email } = newUser;

				let user;
				// Check if userName exists
				user = await User.findOne({ userName });
				if (user) {
					throw new ApolloError("Username is already taken", 422);
				}
				// Check if email exists
				user = await User.findOne({ email });
				if (user) {
					throw new ApolloError("Email is already registered", 422);
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
