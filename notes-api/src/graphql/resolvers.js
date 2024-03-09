// Assuming AWS SDK has been set up to interact with DynamoDB
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'NotesTable';

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
    getNotes: async () => {
      const params = {
        TableName: TABLE_NAME,
      };
      try {
        const { Items } = await dynamoDb.scan(params).promise();
        return Items;
      } catch (error) {
        throw new Error(error);
      } 
    },
    searchNotes: async (_, { searchContent }) => {
      const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'contains(content_search, :searchContent)',
        ExpressionAttributeValues: {
          ':searchContent': searchContent.toLowerCase(),
        },
      };
      try {
        const { Items } = await dynamoDb.scan(params).promise();
        return Items;
      } catch (error) {
        throw new Error("Failed to search notes");
      }
    },
  },
  Mutation: {
    createNote: async (_, { content }) => {
      const newNote = {
        id: uuidv4(),
        content,
        content_search: content.toLowerCase(),
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
        UpdateExpression: 'set content = :content, content_search = :content_search',
        ExpressionAttributeValues: {
          ':content': content,
          ':content_search': content.toLowerCase(),
        },
        ReturnValues: 'ALL_NEW', // Return the updated note
      };
      try {
        const result = await dynamoDb.update(params).promise();
        const updatedNote = result.Attributes ? {
          id: result.Attributes.id,
          content: result.Attributes.content,
          content_search: result.Attributes.content_search,
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
  