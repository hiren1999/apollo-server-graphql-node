import express from 'express';
import { success, error } from 'consola';
import { PORT, IN_PROD, DB, URL } from './config';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import mongoose from 'mongoose';
import * as AppModels from './models';
import { join } from 'path';

const app = express();
// app.use(express.static(join(__dirname, './assets')));

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: IN_PROD,
	context: { ...AppModels },
});

const startApp = async () => {
	try {
		await mongoose
			.connect(DB, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() =>
				success({ message: 'Connected to MongoDB', badge: true })
			)
			.catch((err) => error({ message: err }));

		await server.start();
		server.applyMiddleware({ app });
		app.listen(PORT, () =>
			success({ message: `Server started on port ${PORT}`, badge: true })
		);
	} catch (err) {
		error({
			message: err.message,
			badge: true,
		});
	}
};

startApp();
