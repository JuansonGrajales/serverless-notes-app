const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
    type Note {
        id: ID!
        userId: String!
        content: String!
        createdAt: String!
    }

    type Query {
        getNote(id: ID!): Note
        getNotes(userId: String!, limit: Int, offset: Int): [Note!]!
    }

    type NoteResponse {
        note: Note
        success: Boolean!
        message: String
        errors: [Error]
    }

    type Error {
        message: String!
        field: String
    }

    type Mutation {
        createNote(content: String!, userId: String!): NoteResponse!
        updateNote(id: ID!, content: String!): NoteResponse!
        deleteNote(id: ID!): NoteResponse!
    }
`;
module.exports = typeDefs;