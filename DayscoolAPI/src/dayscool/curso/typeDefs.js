export const cursoTypeDef = `
    type Curso {
        Id: Int!
        nombre: String!
        duenoid: Int!
    }
    input CursoInput {
        nombre: String!
        duenoid: Int!
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
    getCursoById(id: Int!): [Curso]!
    getCursoStudentById(id:Int!): [Curso]!
    getReunionsByStudentId(id: Int!): [Reunion]!
`;

export const cursoMutations = `
    createCurso(curso: CursoInput): Int
    createAlumnos(alumnos: [AlumnoInput]!): Int
    createReunion(reunion: ReunionInput!): Int
    updateCurso(id: Int!, curso: CursoInput!): Int
`