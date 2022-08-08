import {
	ApolloError,
	UserInputError,
	AuthenticationError,
} from "apollo-server-express";

export default {
	Query: {
		getAllPosts: async (_, {}, { Post, isAuth }) => {
			// PARAMETERS(parent, args, context, info)
			if (!isAuth) {
				throw new AuthenticationError("Not Authorization User");
			}
			const posts = await Post.find();
			return posts;
		},
		getPostByID: async (_, { id }, { Post, isAuth }) => {
			if (!isAuth) {
				throw new ApolloError("Not Authorization User", 401);
			}
			if (id.trim() === "") {
				throw new UserInputError("Empty ID", {
					errors: {
						id: "ID is required",
					},
				});
			}
			const post = await Post.findById(id);
			return post;
		},
	},
	Mutation: {
		createNewPost: async (_, { newPost }, { Post, isAuth }) => {
			if (!isAuth) {
				throw new ApolloError("Not Authorization User", 401);
			}
			const createdPost = await Post.create(newPost);
			return createdPost;
		},
		editPostByID: async (_, { updatedPost, id }, { Post, isAuth }) => {
			if (!isAuth) {
				throw new ApolloError("Not Authorization User", 401);
			}
			const editedPost = await Post.findByIdAndUpdate(
				id,
				{
					...updatedPost,
				},
				{ new: true }
			);
			return editedPost;
		},
		deletePostByID: async (_, { id }, { Post, isAuth }) => {
			if (!isAuth) {
				throw new ApolloError("Not Authorization User", 401);
			}
			const deletedPost = await Post.findByIdAndDelete(id);
			return {
				id: deletedPost._id,
				message: "Post deleted successfully",
				success: true,
			};
		},
	},
};
