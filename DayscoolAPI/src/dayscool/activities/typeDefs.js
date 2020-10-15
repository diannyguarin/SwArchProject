// Definir el objeto que van a usar y los campos necesarios para crearlo
export const activitiesTypeDef = `
  type Actividad {
      id: String!
      idCurso: String!
      Nombre: String!
      Fecha: String!
      FechaEntrega: String!
      Descripcion: String!
      Archivo: String!
  }
  input ActividadInput {
      id: String!
      idCurso: String!
      Nombre: String!
      Fecha: String!
      FechaEntrega: String!
      Descripcion: String!
      Archivo: String!
  }
  type Entrega {
      id: String!
      idUsuario: String!
      idActividad: String!
      Nombre: String!
      Fecha: String!
      Descripcion: String!
      Archivo: String!
      Calificacion: String!
  }
  input EntregaInput {
      id: String!
      idUsuario: String!
      idActividad: String!
      Nombre: String!
      Fecha: String!
      Descripcion: String!
      Archivo: String!
      Calificacion: String!
  }`;

//Definir las consultas del objeto (solo GET)
export const activitiesQueries = `
  getAllCategorias: [Actividad]!
  getCategoriaById(id:String!): Actividad!
  getCategoriaByCurso(idCurso:String!): [Actividad]!
  getAllEntregas: [Actividad]!
  getEntregaById(id:String!): Actividad!
  `;
//Definir las mutaciones (POST PUT Y DELETE) 
export const activitiesMutations = `
  createActividad(actividad: ActividadInput!): Actividad!
  createEntrega(entrega: EntregaInput!): Entrega!
  updateActividad(id: String!, actividad: ActividadInput!): Actividad!
  updateEntrega(id: String!, entrega: EntregaInput!): Entrega!
  deleteActividad(id: String!): String
  deleteEntrega(id: String!): String
`;





