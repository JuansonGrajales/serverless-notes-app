// Assuming AWS SDK has been set up to interact with DynamoDB
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'NotesTable';

const resolvers = {
    Query: {
      getNote: async (_, {id}) => {
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
      // getNotes(_, args) {},
      // searchNotes(_, args) {},
    },
    Mutation: {
      createNote: async (_, {title, content}) => {
        const newNote = {
          id: uuidv4(),
          content,
          createAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
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
      // updateNote(_, args) {},
      // deleteNote(_, args) {},
      // deleteNotes(_, args) {},
    },
  };
  
  module.exports = resolvers;
  