import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
//Añadir la url correspondiente a su microservicio
const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
//Añadir las definiciones por url de las request
	Query: {
		getAllCategorias: (_) =>
			getRequest(`${URL}/actividad`, ''),
		getCategoriaById: (_, { id }) =>
			generalRequest(`${URL}/actividad/${id}`, 'GET'),
		getCategoriaByCurso: (_, { idCurso }) =>
			generalRequest(`${URL}/actividad/${idCurso}`, 'GET'),
		getAllEntregas: (_) =>
			getRequest(`${URL}/entrega`, ''),
		getEntregaById: (_, { id }) =>
			generalRequest(`${URL}/entrega/${id}`, 'GET'),
	},
	Mutation: {
		createActividad: (_, { actividad }) =>
			generalRequest(`${URL}/actividad`, 'POST', actividad),
		updateActividad: (_, { id, actividad }) =>
			generalRequest(`${URL}/actividad/${id}`, 'PUT', actividad),
		deleteActividad: (_, { id }) =>
			generalRequest(`${URL}/actividad/${id}`, 'DELETE'),
		createEntrega: (_, { entrega }) =>
			generalRequest(`${URL}/entrega`, 'POST', entrega),
		updateEntrega: (_, { id, entrega }) =>
			generalRequest(`${URL}/entrega/${id}`, 'PUT', entrega),
		deleteEntrega: (_, { id }) =>
			generalRequest(`${URL}/entrega/${id}`, 'DELETE')			
			
	}
};

export default resolvers;
