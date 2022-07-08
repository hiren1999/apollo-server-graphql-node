import { defaultFieldResolver } from 'graphql';
import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server-express';

export class IsAuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...args) {
			const [_, {}, { isAuth, user }] = args;
			if (isAuth) {
				const result = await resolve.apply(this, args);
				return result;
			} else {
				throw new ApolloError('Not authenticated');
			}
		};
	}
}
