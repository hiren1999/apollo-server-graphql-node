import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		infoUserResolvers: String!
	}

	extend type Mutation {
		registerUser(newUser: UserInput!): AuthResp!
	}

	input UserInput {
		firstName: String!
		lastName: String!
		userName: String!
		email: String!
		password: String!
		avatarImage: String
	}

	type User {
		firstName: String!
		lastName: String!
		userName: String!
		email: String!
		avatarImage: String
	}

	type AuthResp {
		user: User!
		token: String!
	}
`;
