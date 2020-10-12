import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getAllNotifications: (_, { userId }) =>
			generalRequest(`${URL}/${userId}`, 'GET'),
		getNotification: (_, { userId, notId }) =>
			generalRequest(`${URL}/${userId}/${notId}`, 'GET')
	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL}`, 'POST', notification),
		deleteNotification: (_, { userId,notId }) =>
			generalRequest(`${URL}/${userId}/${notId}`, 'DELETE'),
		deleteAllNotifications: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
