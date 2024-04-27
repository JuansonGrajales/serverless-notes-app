const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
});

exports.graphqlHandler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
          origin: '*',
          credentials: true,
          allowedHeaders: ['Content-Type', 'Authorization'],
          methods: ['GET', 'POST']
        }
      },
});