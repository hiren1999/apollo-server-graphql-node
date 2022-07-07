import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		featuredImage: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const Post = model('Post', PostSchema);

export default Post;
