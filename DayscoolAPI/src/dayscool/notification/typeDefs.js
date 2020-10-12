export const notificationTypeDef = `
  type Notification {
      _id: String!
      userId:Int!
      conversationId: Int!
      date: String!
      message: String!
      senderId: Int!
  }
  input NotificationInput {
      userId: Int!
      conversationId: Int!
      date: String
      message: String!
      senderId: Int!
  }`;

export const notificationQueries = `
      getAllNotifications(userId: Int!): [Notification]!
      getNotification(userId: Int!, notId: String!): Notification!
  `;

export const notificationMutations = `
    createNotification(notification: NotificationInput!): Notification!
    deleteNotification(userId: Int!, notId: String!): Notification
    deleteAllNotifications(id: Int!): Notification
`;
