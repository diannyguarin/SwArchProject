import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	conversationMutations,
	conversationQueries,
	conversationTypeDef,
	messageTypeDef
} from './supermarket/conversation/typeDefs';

import conversationResolvers from './supermarket/conversation/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		conversationTypeDef,
		messageTypeDef
	],
	[
		conversationQueries
	],
	[
		conversationMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		conversationResolvers
	)
});
