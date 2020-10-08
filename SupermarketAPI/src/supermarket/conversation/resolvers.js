import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allConversations: (_, { idUs }) =>
			getRequest(`${URL}/${idUs}`, ''),
		getMessagesbyConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, ''),
	},
	Mutation: {
		createConversation: (_, { idUs, conversation }) =>
			generalRequest(`${URL}/${idUs}`, '', conversation),
		createMessage: (_, { idUs,idConv, message }) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, '', message),
		deleteConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, ''),
		deleteMessage: (_, { idUs, idConv, idMsg}) =>
			generalRequest(`${URL}/${idUs}/${idConv}/${idMsg}`, '')
	}
};

export default resolvers;
