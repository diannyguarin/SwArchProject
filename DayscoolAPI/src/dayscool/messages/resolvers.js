import { generalRequest, getRequest } from '../../utilities';
//Añadir la url correspondiente a su microservicio
import { url, port, entryPoint } from './server';
const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
//Añadir las definiciones por url de las request
	Query: {
		allConversations: (_, { idUs }) =>
			getRequest(`${URL}/${idUs}`, 'GET'),
		getMessagesbyConversation: (_, { idUs, idConv}) =>
			generalRequest(`${URL}/${idUs}/${idConv}`, 'GET'),
	},
	Mutation: {
		createConversation: (_, { idUs, category }) =>
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
7