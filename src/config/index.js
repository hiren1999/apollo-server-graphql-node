import { config } from 'dotenv';

const { parsed } = config();

export const {
	PORT,
	MODE,
	IN_PROD = MODE !== 'prod',
	DB = 'mongodb://localhost:27017/graphql-apollo-server',
	BASE_URL,
	URL = `${BASE_URL}:${PORT}`,
	JWT_SECRET,
} = parsed;
