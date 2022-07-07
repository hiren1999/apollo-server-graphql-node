import { config } from 'dotenv';

const { parsed } = config();

export const {
	PORT,
	MODE,
	IN_PROD = MODE !== 'prod',
	DB = 'mongodb://localhost:27017/graphql-apollo-server',
} = parsed;
