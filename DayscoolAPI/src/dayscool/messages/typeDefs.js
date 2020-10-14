// Definir el objeto que van a usar y los campos necesarios para crearlo
import { GraphQLInt, GraphQLNonNull } from 'graphql'
const conversation = new GraphQLObjectType({ name: 'conversation', fields: { id: { type: new GraphQLNonNull(GraphQLInt) }, usuario1Id: { type: new GraphQLNonNull(GraphQLInt) }, usuario2Id: { type: new GraphQLNonNull(GraphQLInt) }, }, })
export const conversationTypeDef = `
  type Conversation {
      id: Int!
      usuario1Id: Int!
      usuario2Id: Int!
  }
  input ConversationInput {
      usuario1Id: Int!
      usuario2Id: Int!
  }`;

export const messageTypeDef = `
  type Message {
      id: Int!
      conversationId: GraphQLNonNull(${conversation})!
      text: String!
      sendDate: String!
      remitenteId: Int!
  }
  input MessageInput {
      conversationId: Int!
      text: String!
      sendDate: String!
      remitenteId: Int!
  }`;

export const conversationQueries = `
  allConversations(idUs:Int!): [Conversation]!
  getMessagesbyConversation(idUs: Int!,idConv: Int!): [Message]!
`;

export const conversationMutations = `
  createConversation(idUs: Int!,conversation: ConversationInput!): Conversation!
  createMessage(idUs: Int!,idConv: Int!, message: MessageInput!): Message!
  deleteConversation(idUs: Int!,idConv: Int!): Int
  deleteMessage(idUs: Int!,idConv: Int!, isMsg: Int!): Int
`;


