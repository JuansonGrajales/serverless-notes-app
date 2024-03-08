const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./src/graphql/typeDefs');
const { resolvers } = require('./src/graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});