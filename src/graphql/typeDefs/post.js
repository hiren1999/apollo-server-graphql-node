import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getAllPosts: [Post!]!
		getPostByID(id: ID!): Post!
	}

	extend type Mutation {
		createNewPost(newPost: PostInput!): Post!
		editPostByID(updatedPost: PostInput!, id: ID!): Post!
		deletePostByID(id: ID!): PostNotification!
	}

	input PostInput {
		title: String!
		content: String!
		featuredImage: String
	}

	type Post {
		id: ID!
		title: String!
		content: String!
		updatedAt: String
		createdAt: String
		featuredImage: String
	}

	type PostNotification {
		id: ID!
		message: String!
		success: Boolean!
	}
`;
