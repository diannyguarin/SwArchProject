// Definir el objeto que van a usar y los campos necesarios para crearlo
export const conversationTypeDef = `
  type Conversation {
      id: Long!
      usuario1Id: Long!
      usuario2Id: Long!
  }
  input ConversationInput {
      usuario1Id: Long!
      usuario2Id: Long!
  }`;

export const messageTypeDef = `
  type Message {
      id: Long!
      conversationId: Long!
      text: String!
      sendDate: String!
      remitenteId: Long!
  }
  input MessageInput {
      conversationId: Long!
      text: String!
      sendDate: String!
      remitenteId: Long!
  }`;

export const conversationQueries = `
  allConversations(idUs:Long!): [Conversation]!
  getMessagesbyConversation(idUs: Long!,idConv: Long!): [Message]!
`;

export const conversationMutations = `
  createConversation(idUs: Long!,conversation: ConversationInput!): Conversation!
  createMessage(idUs: Long!,idConv: Long!, message: MessageInput!): Message!
  deleteConversation(idUs: Long!,idConv: Long!): Long
  deleteMessage(idUs: Long!,idConv: Long!, isMsg: Long!): Long
`;


