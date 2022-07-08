import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		authUser: User!
		authenticateUser(userName: String!, password: String!): AuthResp!
	}

	extend type Mutation {
		registerUser(newUser: UserInput!): AuthResp!
	}

	input UserInput {
		userName: String!
		firstName: String!
		lastName: String!
		email: String!
		password: String!
		avatarImage: String
	}

	type User {
		id: ID!
		userName: String!
		firstName: String!
		lastName: String!
		email: String!
		avatarImage: String
	}

	type AuthResp {
		token: String!
		user: User!
	}
`;
