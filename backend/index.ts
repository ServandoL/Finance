import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mongoStart } from './mongo.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './typedefs.js';
import { introspection } from './config.js';

(async () => {
  const port = 9000;
  await mongoStart();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    // context: async ({ req }) => ({
    //   token: getToken(req.headers.authentication),
    // }),
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
