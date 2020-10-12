import {generalRequest, getRequest} from '../../utilities'
import {url, port, entryPoint} from './server.js';

const URL = `http://${url}:${port}/${entryPoint}`

const resolvers = {
    Query: {
        getRoles: (_) =>
			getRequest(`${URL}/roles`, ''),
		getRoleByUuid: (_, { role_uuid }) =>
			generalRequest(`${URL}/roles/${role_uuid}`, 'GET'),

		getMicroservices: (_) =>
			getRequest(`${URL}/microservices`, ''),
		getMicroserviceByUuid: (_, { ms_uuid }) =>
			generalRequest(`${URL}/microservicess/${ms_uuid}`, 'GET'),
		
		getRequests: (_) =>
			getRequest(`${URL}/requests`, ''),
		getRequestByUuid: (_, { request_uuid }) =>
			generalRequest(`${URL}/requests/${request_uuid}`, 'GET'),
			
		getPermissions: (_) =>
			getRequest(`${URL}/permissions`, ''),
		getPermissionByUuid: (_, { permission_uuid }) =>
			generalRequest(`${URL}/permissions/${permission_uuid}`, 'GET'),
    },
    Mutation: {
        addRole: (_, {role}) =>
			generalRequest(`${URL}/roles`, 'POST', role),
		updateRole: (_, {role_uuid, role}) =>
			generalRequest(`${URL}/roles/${role_uuid}`, 'PUT', role),
		deleteRole: (_, {role_uuid}) =>
			generalRequest(`${URL}/roles/${role_uuid}`, 'DELETE'),

		addMicroservice: (_, {microservice}) =>
			generalRequest(`${URL}/microservices`, 'POST', microservice),
		addMicroservice: (_, {ms_uuid, microservice}) =>
			generalRequest(`${URL}/microservices/${ms_uuid}`, 'PUT', microservice),
		addMicroservice: (_, {ms_uuid}) =>
			generalRequest(`${URL}/microservices/${ms_uuid}`, 'DELETE'),
		
		addRequest: (_, {request}) =>
			generalRequest(`${URL}/requests`, 'POST', request),
		updateRequest: (_, {request_uuid, request}) =>
			generalRequest(`${URL}/requests/${request_uuid}`, 'PUT', request),
		deleteRequest: (_, {request_uuid}) =>
			generalRequest(`${URL}/requests/${request_uuid}`, 'DELETE'),

		addPermission: (_, {permission}) =>
			generalRequest(`${URL}/permissions`, 'POST', permission),
		updatePermission: (_, {permission_uuid, permission}) =>
			generalRequest(`${URL}/permissions/${permission_uuid}`, 'PUT', permission),
		deletePermission: (_, {permission_uuid}) =>
			generalRequest(`${URL}/permissions/${permission_uuid}`, 'DELETE')
    }
};

export default resolvers;