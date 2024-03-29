const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        content_search: String!
        createdAt: String!
    }

    type Query {
        getNote(id: ID!): Note!
        getNotes(limit: Int, offset: Int): [Note!]!
        searchNotes(searchContent: String!, limit: Int, offset: Int): [Note!]!
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
        createNote(content: String!): NoteResponse!
        updateNote(id: ID!, content: String!): NoteResponse!
        deleteNote(id: ID!): NoteResponse!
    }
`;
module.exports = typeDefs;