import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { pick } from 'lodash';

export const issueToken = async (user) => {
	let token = await sign(user, JWT_SECRET, { expiresIn: '1d' });
	return `Bearer ${token}`;
};

export const serializeUser = (user) => {
	return pick(user, [
		'id',
		'userName',
		'email',
		'firstName',
		'lastName',
		'avatarImage',
	]);
};
