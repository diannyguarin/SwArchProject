import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allConversations: (_, { idUs }) =>
			generalRequest(`${URL}/${idUs}`, 'GET'),
		getMessagesbyConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, 'GET'),
	},
	Mutation: {
		createConversation: (_, { idUs, conversation }) =>
			generalRequest(`${URL}/${idUs}`, 'POST', conversation),
		createMessage: (_, { idUs,idConv, message }) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, 'POST', message),
		deleteConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, 'DELETE'),
		deleteMessage: (_, { idUs, idConv, idMsg}) =>
			generalRequest(`${URL}/${idUs}/${idConv}/${idMsg}`, 'DELETE')
	}
};

export default resolvers;
