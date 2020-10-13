// Definir el objeto que van a usar y los campos necesarios para crearlo
export const userTypeDef = `
  type User {
      id: Int!
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }
  input UserInput {
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }`;

//Definir las consultas del objeto (solo GET)
export const userQueries = `
  getAllUsers: [User]!
  getUserById(id:Int!): User!
  getUserByUsername(username:String!): User!
  getUserByMail(mail:String!): User!
  `;
//Definir las mutaciones (POST PUT Y DELETE) 
export const userMutations = `
  createUser(user: UserInput!): User!
  updateUser(id: Int!, user: UserInput!): User!
  deleteUser(id: Int!): String
`;





