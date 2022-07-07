import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatarImage: {
			type: String,
			default: 'https://i.pravatar.cc/111',
		},
	},
	{ timestamps: true }
);

const User = model('User', UserSchema);

export default User;
