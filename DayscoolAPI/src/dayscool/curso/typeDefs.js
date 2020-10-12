export const cursoTypeDef = `
    type Curso {
        Id: Int!
        nombre: String!
        duenoId: Int!
    }
    input CursoInput {
        nombre: String!
        duenoId: Int!
    }
`;

export const reunionTypeDef = `
    type Reunion {
        Id: Int!
        fecha: Int!
        cursoId: Int!
    }
    input ReunionInput {
        fecha: Int!
        cursoId: Int!
    }
`;

export const alumnosTypeDef = `
    type Alumno {
        Id: Int!
        personaId: Int!
        cursoId: Int!
    }
    input AlumnoInput {
        personaId: Int!
        cursoId: Int!
    }
`;

//Objetos GET
export const cursoQueries = `
    getCursoById(id: Int!): Curso!
    etCursoStudentById(id:Int!): [Curso]!
`;

export const cursoMutations = `
    createCurso(curso: CursoInput): Int
    createAlumnos(alumnos: [AlumnoInput]!): Int
    createReunion(reunion: ReunionInput!): Int
    updateCurso(id: Int!, curso: CursoInput!): Int
`