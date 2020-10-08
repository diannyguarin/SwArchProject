import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL1 = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allConversations: (_, { idUs }) =>
			getRequest(`${URL1}/${idUs}`, 'GET'),
		getMessagesbyConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL1}/${idUs}/${idConv}`, 'GET'),
	},
	Mutation: {
		createConversation: (_, { idUs, conversation }) =>
			generalRequest(`${URL1}/${idUs}`, 'POST', conversation),
		createMessage: (_, { idUs,idConv, message }) =>
			generalRequest(`${URL1}/${idUs}/${idConv}`, 'POST', message),
		deleteConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL1}/${idUs}/${idConv}`, 'DELETE')
		deleteMessage: (_, { idUs, idConv, idMsg}) =>
			generalRequest(`${URL1}/${idUs}/${idConv}/${idMsg}`, 'DELETE')
	}
};

export default resolvers;
