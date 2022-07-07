export default {
	Query: {
		getAllPosts: async (_, {}, { Post }) => {
			const posts = await Post.find();
			return posts;
		},
		getPostByID: async (_, { id }, { Post }) => {
			const post = await Post.findById(id);
			return post;
		},
	},
	Mutation: {
		createNewPost: async (_, { newPost }, { Post }) => {
			const createdPost = await Post.create(newPost);
			return createdPost;
		},
		editPostByID: async (_, { updatedPost, id }, { Post }) => {
			const editedPost = await Post.findByIdAndUpdate(
				id,
				{
					...updatedPost,
				},
				{ new: true }
			);
			return editedPost;
		},
		deletePostByID: async (_, { id }, { Post }) => {
			const deletedPost = await Post.findByIdAndDelete(id);
			return {
				id: deletedPost._id,
				message: 'Post deleted successfully',
				success: true,
			};
		},
	},
};
