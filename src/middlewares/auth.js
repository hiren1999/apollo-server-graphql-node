import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { User } from '../models';

const AuthMiddleware = async (req, res, next) => {
	const authHeaders = req.get('Authorization');
	if (!authHeaders) {
		req.isAuth = false;
		return next();
	}
	// Bearer token
	let token = authHeaders.split(' ')[1];
	if (!token || token === '') {
		req.isAuth = false;
		return next();
	}
	//  Verify token
	let decodedToken;
	try {
		decodedToken = verify(token, JWT_SECRET);
	} catch (err) {
		req.isAuth = false;
		return next();
	}

	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}
	// Find the user
	const authUser = await User.findById(decodedToken.id);
	if (!authUser) {
		req.isAuth = false;
		return next();
	}
	req.user = authUser;
	req.isAuth = true;
	return next();
};

export default AuthMiddleware;
