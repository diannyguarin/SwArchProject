'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}


async function createMessage(url, method, body, fullResponse) {
	//Crear mensaje y Guardar atributos del mensaje creado
	message = generalRequest(`${URL}/${idUs}/${idConv}`, 'POST', message);
	//Crear notificacion para el usuario receptor del mensaje
	//NotificationInput
	notification = {

	};
	generalRequest(`${URL}`, 'POST', notification);

}

// Definir el objeto que van a usar y los campos necesarios para crearlo
const userTypeDef = `
  type User {
      id: Int!
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }
  input UserInput {
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }`;

//Definir las consultas del objeto (solo GET)
const userQueries = `
  getAllUsers: [User]!
  getUserById(id:Int!): User!
  `;
//Definir las mutaciones (POST PUT Y DELETE) 
const userMutations = `
  createUser(user: UserInput!): User!
  updateUser(id: Int!, user: UserInput!): User!
  deleteUser(id: Int!): String!
`;

// Definir el objeto que van a usar y los campos necesarios para crearlo
const conversationTypeDef = `
  type Conversation {
      id: Int!
      usuario1Id: Int!
      usuario2Id: Int!
  }
  input ConversationInput {
      usuario1Id: Int!
      usuario2Id: Int!
  }`;

const messageTypeDef = `
  type Message {
      id: Int!
      conversationId: Int!
      text: String!
      sendDate: String!
      remitenteId: Int!
  }
  input MessageInput {
      conversationId: Int!
      text: String!
      sendDate: String!
      remitenteId: Int!
  }`;

const conversationQueries = `
  allConversations(idUs:Int!): [Conversation]!
  getMessagesbyConversation(idUs: Int!,idConv: Int!): [Message]!
`;

const conversationMutations = `
  createConversation(idUs: Int!,conversation: ConversationInput!): Conversation!
  createMessage(idUs: Int!,idConv: Int!, message: MessageInput!): Message!
  deleteConversation(idUs: Int!,idConv: Int!): Int
  deleteMessage(idUs: Int!,idConv: Int!, isMsg: Int!): Int
`;

const roleTypeDef = `
  type Role {
    role_uuid: String
    role_name: String
    role_description: String
  }
  input RoleInput {
    role_name: String
    role_description: String
  }`;
const roleQueries = `
  getRoles: [Role]
  getRolebyUuid(role_uuid: String): Role
`;
const roleMutations = `
  addRole(role: RoleInput): Role
  updateRole(role_uuid: String, role: RoleInput): Role
  deleteRole(role_uuid: String): Role
`;

const microserviceTypeDef = `
  type Microservice {
    ms_uuid: String
    ms_name: String
    msDescription: String
  }
  input MicroserviceInput {
    ms_name: String
    ms_description: String
  }
`;
const microserviceQueries = `
  getMicroservices: [Microservice]
  getMicroservicebyUuid(ms_uuid: String): [Microservice]
`;
const microserviceMutations = `
  addMicroservice(microservice: MicroserviceInput): Microservice
  updateMicroservice(ms_uuid: String, microservice: MicroserviceInput): Microservice
  deleteMicroservice(ms_uuid: String): Microservice
`;

const requestTypeDef = `
  type Request {
    request_uuid: String
    ms_uuid: String
    request_type: String
    description: String
  }
  input RequestInput {
    ms_uuid: String
    request_type: String
    description: String
  }
`;
const requestQueries = `
  getRequests: [Request]
  getRequestbyUuid(request_uuid: String): [Request]
`;
const requestMutations = `
  addRequest(request: RequestInput): Request
  updateRequest(request_uuid: String, request: RequestInput): Request
  deleteRequest(request_uuid: String): Request
`;

const permissionTypeDef = `
  type Permission {
    permission_uuid: String
    permission_uuid: String
    request_uuid: String
  }
  input PermissionInput {
    role_uuid: String
    request_uuid: String
  }
`;
const permissionQueries = `
  getPermissions: [Permission]
  getPermissionbyUuid(permission_uuid: String): [Permission]
`;
const permissionMutations = `
  addPermission(permission: PermissionInput): Permission
  updatePermission(permission_uuid: String, permission: PermissionInput): Permission
  deletePermission(permission_uuid: String): Permission
`;

const notificationTypeDef = `
  type Notification {
      _id: String!
      userId:Int!
      conversationid: Int!
      date: String!
      message: String!
      senderId: Int!
  }
  input NotificationInput {
      userId: Int!
      conversationid: Int!
      date: String!
      message: String!
      senderId: Int!
  }`;

const notificationQueries = `
      getAllNotifications(userId: Int!): [Notification]!
      getNotification(userId: Int!, notId: String!): Notification!
  `;

const notificationMutations = `
    createNotification(notification: NotificationInput!): Notification!
    deleteNotification(userId: Int!, notId: String!): String
    deleteAllNotifications(id: Int!): String
`;

const url = '172.17.0.1';
const port = '8080';
const entryPoint = 'ms_user/users';

//Añadir la url correspondiente a su microservicio
const URL$1 = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
//Añadir las definiciones por url de las request
	Query: {
		getAllUsers: (_) =>
			getRequest(URL$1, ''),
		getUserById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$1}/testcreate`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

const url$1 = '172.17.0.1';
const port$1 = '4000';
const entryPoint$1 = 'messages';

//Añadir la url correspondiente a su microservicio
const URL$2 = `http://${url$1}:${port$1}/${entryPoint$1}`;


const resolvers$1 = {
//Añadir las definiciones por url de las request
	Query: {
		allConversations: (_, { idUs }) =>
			generalRequest(`${URL$2}/${idUs}`, 'GET'),
		getMessagesbyConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL$2}/${idUs}/${idConv}`, 'GET'),
	},
	Mutation: {
		createConversation: (_, { idUs, category }) =>
			generalRequest(`${URL$2}/${idUs}`, 'POST', conversation),
		createMessage: (_, { idUs,idConv, message }) =>
			createMessage(`${URL$2}/${idUs}/${idConv}`, 'POST', message),
		deleteConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL$2}/${idUs}/${idConv}`, 'DELETE'),
		deleteMessage: (_, { idUs, idConv, idMsg}) =>
			generalRequest(`${URL$2}/${idUs}/${idConv}/${idMsg}`, 'DELETE')
	}
};

7;

const url$2 = '35.208.121.159';
const port$2 = '80';
const entryPoint$2 = 'api';

const URL$3 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
    Query: {
    getRoles: (_) =>
			generalRequest(`${URL$3}/roles`, 'GET'),
		getRolebyUuid: (_, { role_uuid }) =>
			generalRequest(`${URL$3}/roles/${role_uuid}`, 'GET'),

		getMicroservices: (_) =>
			getRequest(`${URL$3}/microservices`, ''),
		getMicroservicebyUuid: (_, { ms_uuid }) =>
			generalRequest(`${URL$3}/microservicess/${ms_uuid}`, 'GET'),
		
		getRequests: (_) =>
			getRequest(`${URL$3}/requests`, ''),
		getRequestbyUuid: (_, { request_uuid }) =>
			generalRequest(`${URL$3}/requests/${request_uuid}`, 'GET'),
			
		getPermissions: (_) =>
			getRequest(`${URL$3}/permissions`, ''),
		getPermissionbyUuid: (_, { permission_uuid }) =>
			generalRequest(`${URL$3}/permissions/${permission_uuid}`, 'GET'),
    },
    Mutation: {
    addRole: (_, {role}) =>
			generalRequest(`${URL$3}/roles`, 'POST', role),
		updateRole: (_, {role_uuid, role}) =>
			generalRequest(`${URL$3}/roles/${role_uuid}`, 'PUT', role),
		deleteRole: (_, {role_uuid}) =>
			generalRequest(`${URL$3}/roles/${role_uuid}`, 'DELETE'),

		addMicroservice: (_, {microservice}) =>
			generalRequest(`${URL$3}/microservices`, 'POST', microservice),
		addMicroservice: (_, {ms_uuid, microservice}) =>
			generalRequest(`${URL$3}/microservices/${ms_uuid}`, 'PUT', microservice),
		addMicroservice: (_, {ms_uuid}) =>
			generalRequest(`${URL$3}/microservices/${ms_uuid}`, 'DELETE'),
		
		addRequest: (_, {request: request$$1}) =>
			generalRequest(`${URL$3}/requests`, 'POST', request$$1),
		updateRequest: (_, {request_uuid, request: request$$1}) =>
			generalRequest(`${URL$3}/requests/${request_uuid}`, 'PUT', request$$1),
		deleteRequest: (_, {request_uuid}) =>
			generalRequest(`${URL$3}/requests/${request_uuid}`, 'DELETE'),

		addPermission: (_, {permission}) =>
			generalRequest(`${URL$3}/permissions`, 'POST', permission),
		updatePermission: (_, {permission_uuid, permission}) =>
			generalRequest(`${URL$3}/permissions/${permission_uuid}`, 'PUT', permission),
		deletePermission: (_, {permission_uuid}) =>
			generalRequest(`${URL$3}/permissions/${permission_uuid}`, 'DELETE')
    }
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef,
		conversationTypeDef,
		messageTypeDef,
		roleTypeDef,
		microserviceTypeDef,
		requestTypeDef,
		permissionTypeDef,
		notificationTypeDef
	],
	[
		userQueries,
		conversationQueries,
		roleQueries,
		microserviceQueries,
		requestQueries,
		permissionQueries,
		notificationQueries
	],
	[	
		userMutations,
		conversationMutations,
		roleMutations,
		microserviceMutations,
		requestMutations,
		permissionMutations,
		notificationMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
