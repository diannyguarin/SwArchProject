import { generalRequest } from '../../utilities';
import {url, port, entryPoint} from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        getCursoById: (_,{ id }) =>
            generalRequest(`${URL}/${id}`, 'GET'),
        getCursoStudentById: (_, {id}) =>
            generalRequest(`${URL}/alumnos/${id}`, 'GET'),
        getReunionsByStudentId: (_, {id}) =>
            generalRequest(`${URL}/reunion/student/${id}`, 'GET')
    },
    Mutation: {
        createCurso: (_, {curso}) =>
            generalRequest(`${URL}/crear`, 'POST', curso),
        createAlumnos: (_, {alumnos}) =>
            generalRequest(`${URL}/alumnos`, 'POST', alumnos),
        createReunion: (_, {reunion}) =>
            generalRequest(`${URL}/reunion`, 'POST', reunion),
        updateCurso: (_, {id, curso}) =>
            generalRequest(`${URL}/modificar/${id}`, 'PUT', curso)
    }
}

export default resolvers;