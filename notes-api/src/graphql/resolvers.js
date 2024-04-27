// Assuming AWS SDK has been set up to interact with DynamoDB
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'NotesTable';
const USER_ID_INDEX = 'UserIdIndex';

const resolvers = {
  Query: {
    getNote: async (_, { id }) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { id },
      };
      try {
        const { Item } = await dynamoDb.get(params).promise();
        return Item;
      } catch (error) {
        throw new Error(error);
      }
    },
    getNotes: async (_, {userId} ) => {
      // Ensure userId is provided
      if (!userId) {
        throw new Error("userId is required to fetch notes.");
      }
      const params = {
        TableName: TABLE_NAME,
        IndexName: USER_ID_INDEX,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId
        },
      };
      try {
        const { Items } = await dynamoDb.query(params).promise();
        return Items;
      } catch (error) {
        throw new Error(`Error fetching notes: ${error.message}`);
      } 
    },
  },
  Mutation: {
    createNote: async (_, { content, userId }) => {
      const newNote = {
        id: uuidv4(),
        userId,
        content,
        createdAt: new Date().toISOString(),
      };
      const params = {
        TableName: TABLE_NAME,
        Item: newNote,
      };
      try {
        await dynamoDb.put(params).promise();
        return { success: true, note: newNote, message: "Note created successfully", errors: []};
      } catch (error) {
        return { success: false, note: null, message: "Failed to create note", errors: [{message: error.message}]};
      }
    },
    updateNote: async (_, { id, content }) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set content = :content',
        ExpressionAttributeValues: {
          ':content': content,
        },
        ReturnValues: 'ALL_NEW', // Return the updated note
      };
      try {
        const result = await dynamoDb.update(params).promise();
        const updatedNote = result.Attributes ? {
          id: result.Attributes.id,
          content: result.Attributes.content,
          userId: result.Attributes.userId,
          createdAt: result.Attributes.createdAt,
        } : null;

        return {
          success: true,
          note: updatedNote,
          message: "Note updated successfully",
          errors: [],
        };
      } catch (error) {
        return { 
          success: false, 
          note: null, 
          message: "Failed to update note", 
          errors: [{message: error.message}]
        };
      }
    },
    deleteNote: async (_, {id}) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { id },
      };
      try {
        await dynamoDb.delete(params).promise();
        return { success: true, note: null, message: "Note deleted successfully", errors: []};
      } catch (error) {
        return { success: false, note: null, message: "Failed to delete note", errors: [{message: error.message}]};
      }
    },
  },  
};
  
  module.exports = resolvers;
  