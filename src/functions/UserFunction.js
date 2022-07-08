import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { pick } from 'lodash';

export const issueToken = async (user) => {
	let token = await sign(user, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
	return `Bearer ${token}`;
};

export const serializeUser = (user) => {
	return pick(user, ['id', 'userName', 'firstName', 'lastName', 'email']);
};
