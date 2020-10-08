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
      conversationId: Int!
      text: String!
      sendDate: Date!
      remitenteId: Int!
  }
  input MessageInput {
      conversationId: Int!
      text: String!
      sendDate: Date!
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
    deleteMessage(idUs: Int!,idConv: Int!, idMsg: Int!): Int
`;


