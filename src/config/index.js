import { config } from 'dotenv';

const { parsed } = config();

export const {
	PORT,
	MODE,
	JWT_SECRET,
	BASE_URL,
	URL = `${BASE_URL}:${PORT}`,
	IN_PROD = MODE !== 'prod',
	DB = 'mongodb://localhost:27017/graphql-apollo-server',
} = parsed;
