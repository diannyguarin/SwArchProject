import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
//Añadir la url correspondiente a su microservicio
const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
//Añadir las definiciones por url de las request
	Query: {
		getAllUsers: (_) =>
			getRequest(URL, ''),
		getUserById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}/testcreate`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;